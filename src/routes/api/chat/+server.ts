import { StreamingTextResponse, LangChainStream,  } from 'ai';
import type { Message  } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage } from 'langchain/schema';
import type { RequestHandler } from './$types';

const runtime = 'edge';


export async function POST({request}) {
  const { messages } = await request.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}