import path from "node:path";

const prodDirectories = {
  public: path.resolve('public'),
  static: path.resolve('out/static')
};

const devDirectories = {
  public: path.resolve('public'),
  static: path.resolve('src/static')
};

export const directories = process.env.NODE_ENV === 'production' ? prodDirectories : devDirectories;
