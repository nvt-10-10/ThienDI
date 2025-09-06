import { Conversation, ConversationParticipant, Message, User } from "@app/entities";
import { ConversationRepository, MessageRepository, UserRepository } from "@app/modules/share/repositories";
import { AiGroqService } from "@app/modules/share/services";
import { IFilterQuery } from "@app/prototype/interfaces";
import { FindOptions } from "@app/prototype/types";
import { handleException, Paginate } from "@app/utils";
import { Injectable } from "@nestjs/common";
import { DataSource, FindOptionsWhere, ILike, In, Not } from "typeorm";

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    private readonly aiGroqService: AiGroqService
  ) { }


  async getChattedUsers(userId: number, filter: IFilterQuery): Promise<Paginate<Conversation>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const userConversationQuery: FindOptions<Conversation> = {
          where: {
            participants: {
              user_id: userId,
            },
          },
        };

        const userConversations = await this.conversationRepository.findAll(manager, userConversationQuery);
        const userConversationIds = userConversations.map(convo => convo.id);

        const conversationProps = ['id', 'title', 'is_group', 'last_message_id', 'last_message_preview', 'last_message_at'];
        const participantProps = ['id'];
        const participantUserProps = ['id', 'username', 'name', 'avatar'];

        const selectedFields = [
          ...conversationProps.map(field => `${field}`),
          ...participantProps.map(field => `participants.${field}`),
          ...participantUserProps.map(field => `participants.user.${field}`),
        ];

        const conversationQuery: FindOptions<Conversation> = {
          fields: selectedFields,
          where: {
            participants: {
              user_id: Not(userId),
            },
            id: In(userConversationIds),
          },
          relations: ["participants", "participants.user"],
          paginate: {
            page: filter.page,
            size: filter.size,
          },
          sort: {
            allowedColumns: ['last_message_at'],
            sort_by: ['last_message_at'],
            order: ['DESC'],
          },
        };

        return await this.conversationRepository.findWithPagination(manager, conversationQuery);
      });
    } catch (error) {
      handleException(error);
    }
  }

  async getMessagesByConversation(
    conversation_id: number,
    filter: IFilterQuery
  ): Promise<Paginate<Message>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const messageFields = ["id", "content", "created_at", "sender_id"];
        const userFields = ["id", "username", "avatar", "email"];

        const fields = [
          ...messageFields.map(field => `${field}`),
          ...userFields.map(field => `sender.${field}`)
        ];

        const options: FindOptions<Message> = {
          where: {
            conversation_id: conversation_id,
          },
          fields: fields,
          paginate: {
            page: filter.page,
            size: filter.size,
          },
          relations: ["sender"],
          sort: {
            allowedColumns: ['created_at'],
            sort_by: ['created_at'],
            order: ['DESC'],
          },
        }
        const result = await this.messageRepository.findWithPagination(manager, options);
        const items = result.getItems().reverse()
        result.updateItems(items)
        return result
      });
    } catch (error) {
      handleException(error);
    }
  }

  async searchUsersToChat(user_id: number, filter: IFilterQuery): Promise<Paginate<User>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const whereConditions: FindOptionsWhere<User>[] = [];

        if (filter.search) {
          whereConditions.push(
            { id: Not(user_id), name: ILike(`%${filter.search}%`) },
            { id: Not(user_id), username: ILike(`%${filter.search}%`) },
            { id: Not(user_id), email: ILike(`%${filter.search}%`) },
          );
        } else {
          whereConditions.push({ id: Not(user_id) });
        }
        const userFields = ['id', 'username', 'name', 'avatar'];
        const options: FindOptions<User> = {
          fields: userFields,
          where: whereConditions,
          paginate: {
            page: filter.page,
            size: filter.size,
          },
          sort: {
            allowedColumns: ['name', 'username'],
            sort_by: ['name', 'username'],
            order: ['ASC', 'ASC'],
          },
        };
        return await this.userRepository.findWithPagination(manager, options);
      });
    } catch (error) {
      handleException(error);
    }
  }

  async findConversationBetweenUsers(user_a_id: number, user_b_id: number): Promise<Paginate<Message>> {
    try {
      return await this.dataSource.transaction(async (manager) => {
        let conversation = await manager
          .createQueryBuilder(Conversation, "c")
          .innerJoin("c.participants", "cp1", "cp1.user_id = :userA", { userA: user_a_id })
          .innerJoin("c.participants", "cp2", "cp2.user_id = :userB", { userB: user_b_id })
          .where("c.is_group = false")
          .getOne();

        if (!conversation) {
          conversation = await manager.save(Conversation, {
            is_group: false,
            title: null,
          });

          await manager.save(ConversationParticipant, [
            { user_id: user_a_id, conversation_id: conversation.id },
            { user_id: user_b_id, conversation_id: conversation.id },
          ]);
        }

        const filter: IFilterQuery = {
          page: 1,
          size: 9
        }
        return await this.getMessagesByConversation(conversation.id, filter)
      });
    } catch (error) {
      handleException(error);
    }
  }


  async testAi(prompt: string): Promise<string> {
    try {
      const response = await this.aiGroqService.askGroq(prompt);
      return response;
    } catch (error) {
      handleException(error);
      return "Error processing AI request";
    }
  }

}