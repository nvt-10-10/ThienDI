import { Auth, FilterQuery, FilterQuerySwagger, Public } from "@app/core/decorator";
import { IFilterQuery, IJwtPayload } from "@app/prototype/interfaces";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ConversationService } from "../services";
import { HttpResponse } from "@app/common/response";
import { Paginate } from "@app/utils";
import { Conversation, Message, User } from "@app/entities";

@Controller("/api/user/conversation")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }

  @Get('/chatted')
  @FilterQuerySwagger(["last_message_at"])
  async getChattedUsers(@Auth() auth: IJwtPayload, @FilterQuery({
    sortFields: ['last_message_at'],
  }) filter: IFilterQuery): Promise<HttpResponse<Paginate<Conversation>>> {
    const result = await this.conversationService.getChattedUsers(auth.id, filter)
    return HttpResponse.success("Chatted users retrieved successfully", result);
  }

  @Get('/:id/messages')
  @FilterQuerySwagger(["created_at"])
  async getMessagesByConversation(
    @Auth() auth: IJwtPayload,
    @FilterQuery({
      sortFields: ['created_at'],
    }) filter: IFilterQuery,
    @Param('id') conversation_id: number
  ): Promise<HttpResponse<Paginate<Message>>> {
    const result = await this.conversationService.getMessagesByConversation(conversation_id, filter);
    return HttpResponse.success("Messages retrieved successfully", result);
  }

  @Get('/search-user')
  @FilterQuerySwagger([])
  async searchUsersToChat(
    @Auth() auth: IJwtPayload,
    @FilterQuery({}) filter: IFilterQuery,
  ): Promise<HttpResponse<Paginate<User>>> {
    const result = await this.conversationService.searchUsersToChat(auth.id, filter);
    return HttpResponse.success("Users with optional conversation retrieved successfully", result);
  }

  @Get('/with/:target_user_id')
  async getConversationWithUser(
    @Auth() auth: IJwtPayload,
    @Param('target_user_id') targetUserId: number,
  ): Promise<HttpResponse<Paginate<Message>>> {
    const result = await this.conversationService.findConversationBetweenUsers(auth.id, targetUserId);
    return HttpResponse.success("Conversation retrieved", result);
  }

  @Get('/test-ai')
  @Public()
  async test(
    @Auth() auth: IJwtPayload,
    @Query('prompt') prompt: string
  ): Promise<HttpResponse<any>> {
    const result = await this.conversationService.testAi(prompt);
    return HttpResponse.success("Conversation retrieved", result);
  }


}