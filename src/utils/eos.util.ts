import store from "@/store";
import Eos from "eosjs";
const { format } = Eos.modules;
import { prop, path } from "ramda";


export const getChainId = (httpEndpoint:string) => {
    return Eos({httpEndpoint}).getInfo({}).then((res:any) => res.chain_id).catch(() => '0000000000');
};

export const getEos = () => {
  if (!store.state.network) return null;
  const httpEndpoint = `https://${store.state.network.host}:${store.state.network.port}`;
  return Eos({ httpEndpoint, chainId:store.getters.chainId });
};

export const getScatterEos = () => {
  if (!store.state.scatter || !store.state.network) return null;
  return store.state.scatter.eos(store.state.network, Eos, {
    chainId: store.getters.chainId
  });
};

export const getProducerCount = async (httpEndpoint: string) => {
  const eos = Eos({ httpEndpoint, chainId:await getChainId(httpEndpoint) });
  return await eos
    .getTableRows({
      json: true,
      code: "eosio",
      scope: "eosio",
      table: "producers",
      limit: 100000
    })
    .then((res: any) => res.rows.filter((prod:any) => prod.is_active).length)
    .catch(() => 0);
};

const getEosioTable = (
  table: any,
  limit: number = 500,
  index: string = "",
  table_key: string = ""
) => {
  const eos = getEos();
  if (!eos) return null;

  const bounds = index
    ? {
        lower_bound: index,
        upper_bound: typeof index === "string" ? "" : index + limit
      }
    : {};

  return eos.getTableRows(
    Object.assign(
      {
        json: true,
        code: "eosio",
        scope: "eosio",
        table,
        table_key,
        limit
      },
      bounds
    )
  );
};

export const getChainState = () => {
  return getEosioTable("global", 1)
    .then(path(["rows", 0]))
    .catch(() => null);
};

export const getSystemTokenStats = (token: string = "EOS") => {
  return getEos().getCurrencyStats("eosio.token", token);
};

export const getChainProducers = () => {
  return getEosioTable("producers")
    .then((res:any) => res.rows.filter((prod:any) => prod.is_active))
    .catch(() => []);
};

export const getAccount = async (accountName: string) => {
  if (!accountName || !accountName.length) return null;
  if(getEos()) return getEos().getAccount(accountName);
};

export const getBalances = async (accountName: string) => {
  if (!accountName || !accountName.length) return null;
  return await getEos()
    .getTableRows({
      json: true,
      code: "eosio.token",
      scope: accountName,
      table: "accounts"
    })
    .then((res: any) => res.rows.map((b: any) => b.balance))
    .catch([]);
};

export const voteFor = async (
  userAccountName: string,
  producersArray: Array<string>
) => {
  const sorted: Array<string> = producersArray.sort(
    (a: any, b: any) =>
      parseInt(format.encodeName(a, false)) -
      parseInt(format.encodeName(b, false))
  );
  return getScatterEos().voteproducer(userAccountName, "", sorted);
};

export const stakableTokenBalance = async (
  accountName: string,
  token: string = "EOS"
) => {
  const balances = await getBalances(accountName);
  return (
    balances.find((b: any) => b.split(" ")[1] === token) || `0.0000 ${token}`
  );
};

export const delegateAll = async (
  accountName: string,
  token: string = "EOS"
) => {
  const stakable = await stakableTokenBalance(accountName, token);
  const decimals = stakable.replace(` ${token}`, "").split(".")[1].length;
  const division = (stakable.replace(` ${token}`, "") / 2).toFixed(decimals);
  const half = `${division} ${token}`;
  return await getScatterEos().delegatebw(
    accountName,
    accountName,
    half,
    half,
    0
  );
};

export const delegate = async (
  accountName: string,
  net: string,
  cpu: string
) => {
  return await getScatterEos().delegatebw(
    accountName,
    accountName,
    net,
    cpu,
    0
  );
};

export const undelegate = async (
  accountName: string,
  net: string,
  cpu: string
) => {
  return await getScatterEos().undelegatebw(accountName, accountName, net, cpu);
};

export const refundRequest = async (accountName: string) => {
  return getEos()
    .getTableRows({
      json: true,
      code: "eosio",
      scope: format.encodeName(accountName, false),
      table: "refunds",
      limit: 500
    })
    .then((res: any) => (res.rows.length ? res.rows[0] : null))
    .catch(() => null);
};

export const refund = async (accountName: string) => {
  return await getScatterEos().refund(accountName);
};

export const getBlock = (blockNumber: number) =>
  getEos().getBlock({ block_num_or_id: blockNumber });

export const getInfo = () => getEos().getInfo({});
