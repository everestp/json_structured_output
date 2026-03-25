import { ChatOpenAI } from "@langchain/openai";
import { loadenv } from "./env";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";


export type Provider = 'openai' | 'gemini' | 'groq'

export function createChatModel() :{provider :Provider; model : any}{
  loadenv()
  const forced = (process.env.PROVIDER || "").toLowerCase()
  const hasOpenai = !!process.env.OPENAI_API_KEY
  const hasGemini = !!process.env.GOOGLE_API_KEY
  const hasGroq = !!process.env.GROQ_API_KEY

  const base = {temperature : 0 as const}
  if(forced === "openai" || (!forced && hasOpenai)){
    return {
      provider :'openai',
      model : new ChatOpenAI({
        ...base,
        model :"gpt-4o-mini",
      })
    }
  }
   if(forced === "gemini" || (!forced && hasGemini)){
    return {
      provider :'gemini',
      model : new ChatGoogleGenerativeAI({
        ...base,
        model :"gemini-2.0-flash-lite",
      })
    }
  }
   if(forced === "gorq" || (!forced && hasOpenai)){
    return {
      provider :'groq',
      model : new ChatGroq({
        ...base,
        model :"llama-3.1-8b-instant",
      })
    }
  }
   return {
      provider :'gemini',
      model : new ChatGoogleGenerativeAI({
        ...base,
        model :"gemini-2.0-flash-lite",
      })
    }
}
