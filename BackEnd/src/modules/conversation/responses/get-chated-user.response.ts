import { BaseResponseDto, PaginatedResponseDto } from '@app/common/dtos';
import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ nullable: true })
  avatar: string;
}

class ParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}


class ConversationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ nullable: true })
  title: string;

  @ApiProperty()
  is_group: boolean;

  @ApiProperty({ nullable: true })
  last_message_id: number;

  @ApiProperty({ nullable: true })
  last_message_preview: string;

  @ApiProperty({ nullable: true })
  last_message_at: Date;

  @ApiProperty({ type: () => [ParticipantResponseDto] })
  participants: ParticipantResponseDto[];
}

export class GetChatedUserResponseDto extends BaseResponseDto<PaginatedResponseDto<ConversationResponseDto>> {
}
