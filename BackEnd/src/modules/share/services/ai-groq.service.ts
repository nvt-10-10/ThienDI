import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiGroqService {
  private readonly logger = new Logger(AiGroqService.name);
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY.API_KEY_GROQ');
  }
  async askGroq(prompt: string): Promise<string> {
    try {
      const context = `
      📘 GIÁO TRÌNH NGÀY 1 – GIỚI THIỆU BẢN THÂN (SELF INTRODUCTION)
Đối tượng: Người mất gốc tiếng Anh
Mục tiêu:

Học cách giới thiệu tên, tuổi, nghề nghiệp, nơi ở

Ghi nhớ 10 từ vựng cơ bản

Thực hành hội thoại đơn giản

🔤 PHẦN 1: CẤU TRÚC CÂU CƠ BẢN
1. Câu giới thiệu tên
👉 My name is + [tên của bạn].
🗣️ My name is Tuyen. (Tôi tên là Tuyền)
📌 Phiên âm: /maɪ neɪm ɪz/

2. Câu nói tuổi
👉 I am + [số tuổi] + years old.
🗣️ I am 23 years old. (Tôi 23 tuổi)
📌 Phiên âm: /aɪ æm ... jɪəz əʊld/

3. Câu nói nghề nghiệp
👉 I am a + [nghề nghiệp].
🗣️ I am a student. (Tôi là sinh viên)
📌 Phiên âm: /aɪ æm ə ˈstjuːdənt/

4. Câu nói nơi ở
👉 I live in + [thành phố].
🗣️ I live in Da Nang. (Tôi sống ở Đà Nẵng)
📌 Phiên âm: /aɪ lɪv ɪn .../

🧠 PHẦN 2: TỪ VỰNG CẦN GHI NHỚ (10 từ)
Từ vựng	Nghĩa	Phiên âm
name	tên	/neɪm/
age	tuổi	/eɪdʒ/
student	sinh viên	/ˈstjuːdənt/
teacher	giáo viên	/ˈtiːtʃər/
worker	công nhân	/ˈwɜːkər/
live	sống	/lɪv/
city	thành phố	/ˈsɪti/
years old	tuổi	/jɪəz əʊld/
I am	tôi là	/aɪ æm/
My name is	tên tôi là	/maɪ neɪm ɪz/

💬 PHẦN 3: HỘI THOẠI MẪU
A: Hello! What’s your name?
B: My name is Tuyen.
A: How old are you?
B: I am 23 years old.
A: What do you do?
B: I am a student.
A: Where do you live?
B: I live in Da Nang.

📝 PHẦN 4: BÀI TẬP
Bài 1: Dịch sang tiếng Anh
Tôi tên là Lan.

Tôi 30 tuổi.

Tôi là giáo viên.

Tôi sống ở Hà Nội.

<details> <summary>💡 Xem gợi ý đáp án</summary>
My name is Lan.

I am 30 years old.

I am a teacher.

I live in Hanoi.

</details>
Bài 2: Điền từ còn thiếu
My _____ is Minh.

I am _____ years old.

I am a ______.

I _____ in Ho Chi Minh City.

🎤 PHẦN 5: LUYỆN NÓI
Hãy luyện nói theo các bước sau:

Đọc từng câu mẫu chậm, rõ ràng.

Ghi âm lại giọng mình và nghe lại.

So sánh với phiên âm (hoặc video/audio mẫu nếu có).

Bạn có muốn tôi làm thêm giáo trình Ngày 2: Số đếm – Numbers không? Hoặc tôi có thể tạo file PDF để bạn in ra học dần nhé!`
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'gemma2-9b-it',
          messages: [
            {
              role: 'system',
              content:
                'You are an experienced English teacher. You are teaching beginners. Explain clearly and simply in Vietnamese, and include examples to help understanding.',
            },
            {
              role: 'system',
              content: `You are an experienced English teacher. Use the following lesson to answer questions.\n\n${context}`,
            },

            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1000, // Giới hạn output tránh lãng phí token
          temperature: 0.7, // Độ sáng tạo
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content: string = response.data?.choices?.[0]?.message?.content?.trim();
      return content || 'Không có phản hồi từ AI.';
    } catch (error) {
      this.logger.error('Groq API call failed', error);
      throw new Error('Lỗi gọi Groq AI');
    }
  }
}
