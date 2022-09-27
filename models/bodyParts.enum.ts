export enum BodyParts {
  LHand,
  RHand,
  LFoot,
  RFoot
}

// helper class used to access the above enum
// usage can be either via the array or
// use the get method eg.  BodyPartsHelper.get("LHand")
export class BodyPartsHelper {

  static bodyParts: BodyParts[] = [
    BodyParts.LFoot,
    BodyParts.LHand,
    BodyParts.RFoot,
    BodyParts.RHand
  ];

  constructor() {}

  static get(key: string): BodyParts {
    switch (key) {
      case "LHand":
        return BodyParts.LHand;
      case "RHand":
          return BodyParts.RHand;
      case "LFoot":
        return BodyParts.LFoot;
      case "RFoot":
        return BodyParts.RFoot;
    }
  }
}