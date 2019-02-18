import * as ETHModule from "../modules/ethmodule";

// Scene if Metamask is connected
export function metamasktrue() {
  const PlaneMain = new Entity();
  PlaneMain.add(new PlaneShape());
  PlaneMain.add(new Transform({ position: new Vector3(5, 4, 9), scale: new Vector3(8, 8, 1) }))
  PlaneMain.get(Transform).rotation.setEuler(0, 0, 90)
  engine.addEntity(PlaneMain)

  const HeadLine = new Entity();
  let HeadLineValue = new TextShape("DCL-Blockchain-Interaction\n(use Ropsten-network!)");

  HeadLine.set(new Transform())
  HeadLine.get(Transform).position.set(5, 7, 8.9)
  HeadLine.get(Transform).rotation.setEuler(0, 0, 0)
  HeadLine.get(Transform).scale.setAll(1);
  engine.addEntity(HeadLine);
  HeadLineValue.fontSize = 250;
  HeadLineValue.color = Color3.Blue();
  HeadLineValue.fontFamily = "Arial, Helvetica, sans-serif";
  HeadLineValue.hAlign = "center";
  HeadLineValue.width = 7;
  HeadLineValue.height = 2;
  HeadLineValue.lineSpacing = "50";
  HeadLine.add(HeadLineValue);
  HeadLine.get(TextShape).shadowColor = Color3.Gray();
  HeadLine.get(TextShape).shadowOffsetY = 1;

  const TextFirstLine = new Entity();
  let TextFirstLineText = new TextShape("Your wallet address:\n" + ETHModule.UserAccountGlobal + "\nYour balance:\n" + ETHModule.UserBalanceGlobal + " ETH\nat block-number:\n" + ETHModule.BlockNumberGlobal + "\nYour nonce:\n" + ETHModule.nonceGlobal + "\nToken Name:\n" + ETHModule.TokenNameRopstenGlobal + "\nToken Decimals:\n" + ETHModule.TokendecimalsRopstenGlobal + "\nToken Total Supply:\n" + ETHModule.TokentotalSupplyRopstenGlobal);

  TextFirstLine.set(new Transform())
  TextFirstLine.get(Transform).position.set(5, 4, 8.9)
  TextFirstLine.get(Transform).rotation.setEuler(0, 0, 0)
  TextFirstLine.get(Transform).scale.setAll(1);
  engine.addEntity(TextFirstLine);
  TextFirstLineText.fontSize = 130;
  TextFirstLineText.color = Color3.Black();
  TextFirstLineText.fontFamily = "Arial, Helvetica, sans-serif";
  TextFirstLineText.hAlign = "left";
  TextFirstLineText.width = 7;
  TextFirstLineText.height = 8;
  TextFirstLineText.lineSpacing = "50";
  TextFirstLine.add(TextFirstLineText);
  TextFirstLine.get(TextShape).shadowColor = Color3.Gray();
  TextFirstLine.get(TextShape).shadowOffsetY = 1;

  // Delaying ScreenInfo due to the current SDK-problem not refreshing on-the-fly
  let timer = 0; let firstload = 0;
  class UpdateScreen implements ISystem {
    update(dt: number) {
      timer++;
      if (timer == 320) {
        if (firstload == 0) {
          engine.removeEntity(TextFirstLine);
          firstload = 1;
        }
        // engine.removeEntity(TextFirstLine);
        const TextFirstLineactual = new Entity();
        TextFirstLineText = new TextShape("Your wallet address:\n" + ETHModule.UserAccountGlobal + "\nYour balance:\n" + ETHModule.UserBalanceGlobal + " ETH\nat block-number:\n" + ETHModule.BlockNumberGlobal + "\nYour nonce:\n" + ETHModule.nonceGlobal + "\nToken Name:\n" + ETHModule.TokenNameRopstenGlobal + "\nToken Decimals:\n" + ETHModule.TokendecimalsRopstenGlobal + "\nToken Total Supply:\n" + ETHModule.TokentotalSupplyRopstenGlobal);
        TextFirstLineactual.set(new Transform())
        TextFirstLineactual.get(Transform).position.set(5, 4, 8.9)
        TextFirstLineactual.get(Transform).rotation.setEuler(0, 0, 0)
        TextFirstLineactual.get(Transform).scale.setAll(1);
        engine.addEntity(TextFirstLineactual);
        TextFirstLineText.fontSize = 130;
        TextFirstLineText.color = Color3.Black();
        TextFirstLineText.fontFamily = "Arial, Helvetica, sans-serif";
        TextFirstLineText.hAlign = "left";
        TextFirstLineText.width = 7;
        TextFirstLineText.height = 8;
        TextFirstLineText.lineSpacing = "50";
        TextFirstLineactual.add(TextFirstLineText);
        TextFirstLineactual.get(TextShape).shadowColor = Color3.Gray();
        TextFirstLineactual.get(TextShape).shadowOffsetY = 1;
        // timer = 0; possibility to make a time-loop/refresh
      }

    }
  }

  engine.addSystem(new UpdateScreen())

  const PayButton = new Entity();
  PayButton.add(new BoxShape());
  PayButton.add(new Transform({ position: new Vector3(6.2, 3.2, 8.75), scale: new Vector3(0.75, 0.75, 0.75) }))
  const PayButtonMaterial = new Material();
  PayButtonMaterial.albedoColor = Color3.Red(); PayButton.set(PayButtonMaterial);
  PayButton.add(new OnClick(e => {
    ETHModule.payment()
  }))
  engine.addEntity(PayButton)

  const BuyText = new Entity();
  let BuyTextValue = new TextShape("Press button to buy/pay 0.005 ETH\n(use Ropsten-network!)");

  BuyText.set(new Transform())
  BuyText.get(Transform).position.set(6.2, 4.2, 8.9)
  BuyText.get(Transform).rotation.setEuler(0, 0, 0)
  BuyText.get(Transform).scale.setAll(1);
  engine.addEntity(BuyText);
  BuyTextValue.fontSize = 130;
  BuyTextValue.color = Color3.Green();
  BuyTextValue.fontFamily = "Arial, Helvetica, sans-serif";
  BuyTextValue.hAlign = "center";
  BuyTextValue.width = 4;
  BuyTextValue.height = 2;
  BuyTextValue.lineSpacing = "50";
  BuyText.add(BuyTextValue);
  BuyText.get(TextShape).shadowColor = Color3.Gray();
  BuyText.get(TextShape).shadowOffsetY = 1;

  const TipPlane = new Entity();
  TipPlane.add(new PlaneShape());
  TipPlane.add(new Transform({ position: new Vector3(7.7, 1.3, 8.85), scale: new Vector3(2, 2.4, 1) }))
  TipPlane.get(Transform).rotation.setEuler(0, 0, 0)
  const TipPlanematerial = new Material();
  TipPlanematerial.albedoTexture = "images/tipforcodinglightning.jpg";
  TipPlane.set(TipPlanematerial);
  engine.addEntity(TipPlane);
}

// Scene if Metamask is not connected
export function metamaskfalse() {
  log("No Metamask-Connection")
  const PlaneMain = new Entity();
  PlaneMain.add(new PlaneShape());
  PlaneMain.add(new Transform({ position: new Vector3(5, 4, 5), scale: new Vector3(8, 8, 1) }))
  engine.addEntity(PlaneMain)
  const HeadLine = new Entity();
  let HeadLineValue = new TextShape("NO\nMETAMASK-CONNECTION !\n \nLogin to Metamask\nand refresh page !\n(use Ropsten-network !)");
  HeadLine.set(new Transform())
  HeadLine.get(Transform).position.set(5, 4, 4.9)
  HeadLine.get(Transform).rotation.setEuler(0, 0, 0)
  HeadLine.get(Transform).scale.setAll(1);
  engine.addEntity(HeadLine);
  HeadLineValue.fontSize = 250;
  HeadLineValue.color = Color3.Red();
  HeadLineValue.fontFamily = "Arial, Helvetica, sans-serif";
  HeadLineValue.hAlign = "center";
  HeadLineValue.width = 7;
  HeadLineValue.height = 7;
  HeadLineValue.lineSpacing = "50";
  HeadLine.add(HeadLineValue);
  HeadLine.get(TextShape).shadowColor = Color3.Gray();
  HeadLine.get(TextShape).shadowOffsetY = 1;

}