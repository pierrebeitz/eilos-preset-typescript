import { DefinePresetFile } from "eilos";
import { Options } from "../options";

import configWebpackBase from "./webpack.config.base";
import configWebpackHot from "./webpack.config.hot";

const file = DefinePresetFile(Options, {
  mimeType: "application/javascript",
  generator: (ctx) => {
    const { merge } = ctx.util;
    const userConfig = ctx.getOption("webpack", {});

    // Enable hot module replacement if requested
    let config = configWebpackBase(ctx);
    if (ctx.getOption("hot")) {
      config = merge(config, configWebpackHot(ctx));
    }

    return merge(config, userConfig);
  },
});

export default file;
