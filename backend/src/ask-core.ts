import { createChatModel } from "./lc-model";
import { AskResult, AskResultSchema } from "./schema";


export async function askStructured(query :string) :Promise <AskResult>{
  const {model} = createChatModel()

  //keep instruction brief so that  schemas visible to the model
  const system = "You are a concise assistance . Return only the request JSON"
  const user = `Summarize for a beginner :\n` + `"${query}" \n`+
  `Return field : summary(short paragraph), confidece (0..1)`

  const structured = model.withStructuredOutput(AskResultSchema);

  const result = await structured.invoke([{
    role :'system',
    content: system
  },
  {
    role:"user",
    content :user
  }
])
}
