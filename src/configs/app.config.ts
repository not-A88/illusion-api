class AppConfig {
  static port: number = 3000;
  static environment: string = 'production'; //production/development
  static UrlBase: string = `http://localhost:3000`;

  //static ipAllowed: string[] = [  ]; //ips allowed for private api
  static privateApiKey: string = ' ';
}

export = AppConfig;
