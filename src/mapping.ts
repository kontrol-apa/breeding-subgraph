import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  HopperNFT,
  Approval,
  ApprovalForAll,
  LevelUp,
  NameChange,
  OwnerUpdated,
  Rebirth,
  Transfer,
  UnlabeledData,
  UpdatedNameFee
} from "../generated/HopperNFT/HopperNFT"
import { HopperInBreeding } from "../generated/schema"


export function handleTransfer(event: Transfer): void {
  let contractAddy = Bytes.fromHexString("0xcd5248a3Ef4a91f029c44926D07dE849B42E249c");
  let entity = HopperInBreeding.load(event.transaction.from.toHex())
  if (event.transaction.to!.equals(contractAddy)) {
    if (!entity) {
      entity = new HopperInBreeding(event.params.id.toHex());
    }
    entity.enteredOn = event.block.timestamp.toI32();
    entity.lastExit = entity.enteredOn + (3600 * 24); // placeholder
    entity.currentlyBreeding = true;
    entity.owner = event.transaction.from;

  }
  else if (event.transaction.from.equals(contractAddy)) {
    entity!.lastExit = event.block.timestamp.toI32();
    entity!.currentlyBreeding = false;


  }
  entity!.save();

}


