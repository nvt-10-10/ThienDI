import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({
    description: 'Access token mới',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  access_token?: string;

  @ApiProperty({
    description: 'Refresh token mới (nếu được cấp lại)',
    example: 'dGVzdC5yZWZyZXNoLnRva2Vu...',
    required: false,
  })
  refresh_token?: string;
}
