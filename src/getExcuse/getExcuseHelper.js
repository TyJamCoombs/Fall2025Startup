export const excusePool = {
  sandtrap: [
    "Ball buried in the bunker",
    "Sand was too soft",
    "Club slipped on entry",
    "Distracted by seagull overhead",
    "Hit the lip of the bunker",
    "Took too much sand",
    "Sun glare off the rake",
    "Lost balance in the swing"
  ],
  choked: [
    "Grip was too tight",
    "Thought about the water",
    "Crowd pressure got to me",
    "Over‑swung at the last second",
    "Hands got sweaty",
    "Forgot my pre‑shot routine",
    "Wind picked up suddenly",
    "Mind went blank"
  ],
  water: [
    "Wind carried it",
    "Splash zone was bigger than expected",
    "Clubface opened up",
    "Fish jumped at the wrong time",
    "Ball spun sideways",
    "Misjudged the carry",
    "Distracted by ducks",
    "Club slipped at impact"
  ],
  house: [
    "Hooked it badly",
    "Neighbor’s roof is magnetic",
    "Ball ricocheted off a tree",
    "Didn’t see the house there",
    "Clubface closed early",
    "Over‑drew the shot",
    "Lost my footing",
    "Got startled mid‑swing"
  ]
};

export function GetRandomExcuses(category, count = 4) {
  const pool = excusePool[category] || [];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
