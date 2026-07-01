// Verified royalty-free Unsplash photo IDs (all return 200 image/jpeg).
// Demo imagery only — swapped for client/brand assets in the paid build.

const U = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=70`;

export const IMG = {
  heroCar: U("1568844293986-8d0400bd4745", 1400, 1000), // dark moody yellow M4
  driving: U("1449965408869-eaa3f722e40d", 1200, 900), // hand on wheel, driving
  guidedWheel: U("1571607388263-1044f9ea01dd", 1200, 900), // dark car rear / wheel
  mechanic: U("1558618666-fcd25c85cd64", 1200, 900), // mechanic with tool
  installHands: U("1487754180451-c456f719a1fc", 1200, 900), // working under car
  checkoutCar: U("1503376780353-7e6692767b70", 1400, 700), // dark Panamera
  journeyRoad: U("1568605117036-5fe5e7bab0b7", 1400, 900), // GTR on sunset road
  deals: {
    offroad: U("1533473359331-0135ef1b58bf", 800, 900), // white SUV desert
    summer: U("1605559424843-9e4c228bf1c2", 800, 900), // yellow AMG GT
    muscle: U("1547744152-14d985cb937f", 800, 900), // black Mustang bridge
    super: U("1583121274602-3e2820c69888", 800, 900), // red supercar
  },
} as const;
