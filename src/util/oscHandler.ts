import OSC from "osc-js";

// Create a new OSC instance
const osc = new OSC({
  plugin: new OSC.WebsocketClientPlugin({
    port: 4560, // Sonic Pi's default port
  })
});

// Connect to the server
osc.open();

/**
 * Send a message to Sonic Pi
 * @param address The OSC address
 * @param args The arguments to send
 */

export const sendToSonicPi = (address: string, args: any[]) =>{
    const message = new OSC.Message(address, ...args);
    osc.send(message);
};