import { proxy } from "valtio";

const state = proxy({
  intro: true,
  logoDecal: "/Relive.png",
  start: true,
  kitchen: false,
  living: false,
  wood: true,
  granite: false,
  white: false,
  aiTexture: false,
  aiTextureURL:"https://pbxt.replicate.delivery/WVxHg12oCy75Dhh78TteyS8CeDrZi0fMiMOGc52XMIvTYZmjA/out-0.png",
});

export default state;
