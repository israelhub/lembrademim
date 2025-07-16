import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBiographyDto {
  @ApiProperty({ example: 'Ana Costa' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '(21) 999123-5627 ' })
  cellphoneNumber: string;

  @ApiProperty({ example: '2025-01-01' })
  birthDate: Date;

  @ApiProperty({
    example: ['Programadora', 'Cunhada'],
    type: 'array',
    items: { type: 'string' },
  })
  tags: string[];

  @ApiProperty({ example: 'Gosta muito de jogos' })
  notes: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profileImage: string;
}
