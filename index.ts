import * as yargs from "yargs";

type Challenge = {
  solve: (testMode?: boolean) => Promise<number>;
};

(async () => {
  const args = await yargs
    .option("challenge", {
      alias: "c",
      demand: true,
      type: "string",
    })
    .option("test", {
      alias: "t",
      demand: false,
      type: "boolean",
    }).argv;

  const challengeNumber = args.challenge;

  const [day] = challengeNumber.split("_");

  const challenge: Challenge = await import(
    `./challenges/day${day}/challenge${challengeNumber}`
  );

  console.log(await challenge.solve(args.test));
})();
