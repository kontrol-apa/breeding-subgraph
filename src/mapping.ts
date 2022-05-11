import {  Bytes } from "@graphprotocol/graph-ts"
import {
  Transfer,
} from "../generated/HopperNFT/HopperNFT"
import { HopperInBreeding } from "../generated/schema"


export function handleTransfer(event: Transfer): void {

  const breedingAddy = Bytes.fromHexString("0xcd5248a3Ef4a91f029c44926D07dE849B42E249c");
  if (event.params.to.equals(breedingAddy)) {
    let entity = HopperInBreeding.load(event.params.id.toHex())
    if (!entity) {
      entity = new HopperInBreeding(event.params.id.toHex());
    }
    entity.enteredOn = event.block.timestamp.toI32();
    entity.currentlyBreeding = true;
    entity.owner = event.transaction.from;
    entity.save();

  }
  else if (event.params.from.equals(breedingAddy)) {
    let entity = HopperInBreeding.load(event.params.id.toHex())
    if (entity) {
      entity.lastExit = event.block.timestamp.toI32();
      entity.currentlyBreeding = false;
      entity.save();
    }

  }
}





