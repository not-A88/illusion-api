class BlacklistConfig {
  static reportToWebHook: boolean = true; //Report to discord webhook when user gets blacklisted
  static blacklistOn: number = 3; //Blacklist user on warning number
}

export = BlacklistConfig;
