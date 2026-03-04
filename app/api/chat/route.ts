import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `당신은 법무법인 더 에이치 황해의 입주예정자협의회 집단등기 전문 AI 상담사입니다.
집단등기 절차, 비용, 서류, 일정에 대해 친절하고 정확하게 안내합니다.
법적 판단이 필요한 복잡한 사항은 "전문 변호사 직접 상담을 권장드립니다"로 안내하세요.
반드시 한국어로 답변하세요. 간결하고 명확하게 3-5줄 이내로.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    return NextResponse.json({
      content: response.content[0].type === 'text' ? response.content[0].text : '',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
