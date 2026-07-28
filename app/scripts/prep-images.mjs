import sharp from "sharp";
import { mkdirSync } from "fs";
const SRC="../raw/images", OUT="public/img";
mkdirSync(OUT,{recursive:true});

// 1. Split the header triptych into three hero plates
const panels=[["hero-weathervane",0,249],["hero-boxes",249,210],["hero-sheep",459,241]];
for(const [name,left,w] of panels){
  await sharp(`${SRC}/Pewter-Wood-Header2.png`)
    .extract({left,top:0,width:w,height:212})
    .resize({width:w*3,kernel:"lanczos3"})
    .png({quality:92}).toFile(`${OUT}/${name}.png`);
  console.log("panel:",name,w+"x212 -> "+(w*3));
}

// 2. Normalise the photography into web-ready webp + jpg fallback
const photos=["nh_shop_chickens","NH_shop_boxes","NH_shop_dog","NH-shop-dolls","az-showroom",
  "arizona_cactus","antique-show","pewter-and-wood-show","newhampshire","arizona"];
for(const p of photos){
  const meta=await sharp(`${SRC}/${p}.jpg`).metadata();
  await sharp(`${SRC}/${p}.jpg`).rotate()
    .resize({width:Math.min(1600,meta.width*2),withoutEnlargement:false,kernel:"lanczos3"})
    .webp({quality:86}).toFile(`${OUT}/${p}.webp`);
  console.log("photo:",p,`${meta.width}x${meta.height}`);
}

// 3. Logos / badges
for(const l of ["Pewterandwood-pineapple-logo","NHADA-logo","VADA_logo"]){
  const ext=l==="NHADA-logo"?"gif":"jpg";
  await sharp(`${SRC}/${l}.${ext}`).resize({width:400,kernel:"lanczos3"})
    .png().toFile(`${OUT}/${l}.png`);
  console.log("logo:",l);
}
await sharp(`${SRC}/Pewterandwood-pineapple-fav-sq.jpg`).resize(180,180).png().toFile(`${OUT}/pineapple-mark.png`);
console.log("done");
