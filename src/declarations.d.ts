declare module "eosjs"

declare module "*.json" {
  const value: any;
  export default value;
}