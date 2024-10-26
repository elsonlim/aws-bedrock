import {
  BedrockClient,
  GetFoundationModelCommand,
  ListFoundationModelsCommand,
} from "@aws-sdk/client-bedrock";

const client = new BedrockClient({ region: "ap-southeast-1" });

const listFoundationModels = async () => {
  const listFoundationModelsCommandObj = new ListFoundationModelsCommand({});
  const res = await client.send(listFoundationModelsCommandObj);

  console.log(res);
};

const getModelInfo = async (modelIdentifier: string) => {
  const command = new GetFoundationModelCommand({ modelIdentifier });
  const res = await client.send(command);

  console.log(res);
};

// listFoundationModels();
getModelInfo("anthropic.claude-v2");
