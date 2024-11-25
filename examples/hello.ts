interface Developer {
  name: string;
  caffeineLevel: number;
  skills: string[];
  debugMode: boolean;
  deploy: () => string;
}

const developer: Developer = {
  name: "Bugsy Fixwell",
  caffeineLevel: Infinity,
  skills: ["TypeScript", "Debugging", "Procrastinating"],
  debugMode: true,
  deploy: () => "Deploying... Oh no, forgot to remove console.logs!",
};

console.log(developer.deploy());
