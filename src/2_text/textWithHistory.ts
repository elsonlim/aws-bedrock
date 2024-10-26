import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "ap-northeast-1" }); // Tokyo

type UserMessage = `User: ${string}`;
type BotMessage = `Bot: ${string}`;

const history: Array<UserMessage | BotMessage> = [];

const createTitanRequestBody = () => {
  const formattedHistory = history.join("\n");
  return {
    inputText: formattedHistory,
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 1,
    },
  };
};

const invokeModel = async (titanRequestBody: any) => {
  const modelCommandObj = new InvokeModelCommand({
    modelId: modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(titanRequestBody),
  });

  const res = await client.send(modelCommandObj);

  const responseBody = JSON.parse(new TextDecoder().decode(res.body)); // convert uni8IntArray to string

  return responseBody;
};

const modelId = "amazon.titan-text-express-v1";

const main = async () => {
  console.log("Start the conversation...");
  process.stdin.addListener("data", async (input) => {
    const userInput = input.toString().trim();
    history.push(`User: ${userInput}`);
    const reqBody = createTitanRequestBody();
    const responseBody = await invokeModel(reqBody);
    const outputText =
      `${responseBody.results[0].outputText.trim()}` as BotMessage;
    console.log(outputText);
    history.push(outputText);
  });
};

main();
