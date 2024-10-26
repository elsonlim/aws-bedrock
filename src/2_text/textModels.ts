import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "ap-northeast-1" }); // Tokyo

const titanRequestBody = {
  inputText: "Tell me the story of Gudetama",
  textGenerationConfig: {
    maxTokenCount: 4096,
    stopSequences: [],
    temperature: 0,
    topP: 1,
  },
};

const modelId = "amazon.titan-text-express-v1";

const invokeModel = async () => {
  const modelCommandObj = new InvokeModelCommand({
    modelId: modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(titanRequestBody),
  });

  const res = await client.send(modelCommandObj);

  const responseBody = JSON.parse(new TextDecoder().decode(res.body)); // convert uni8IntArray to string
  console.log(responseBody);
};

invokeModel();
