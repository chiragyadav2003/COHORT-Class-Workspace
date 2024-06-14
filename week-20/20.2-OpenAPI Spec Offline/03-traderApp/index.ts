import { DefaultService } from "./generated";

const main = async () => {
  const response = await DefaultService.getUsers('123');
  console.log(response);
}

main();