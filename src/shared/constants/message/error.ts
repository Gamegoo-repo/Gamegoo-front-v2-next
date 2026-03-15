const isProduction = process.env.NODE_ENV === "production";

const errorMessage = (errorFunctionType: string, name: string) => {
  if (!isProduction) return `🚫 ${errorFunctionType} Error: ${name}`;
};

export const ERROR_MESSAGES = {
  QUERY: (description: string) => errorMessage("Query", description),
  MUTATION: (description: string) => errorMessage("Mutation", description),

  API: (apiName: string) => errorMessage("API", apiName)
};
