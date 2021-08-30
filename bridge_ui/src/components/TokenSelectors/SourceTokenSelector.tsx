//import Autocomplete from '@material-ui/lab/Autocomplete';
import { CHAIN_ID_ETH, CHAIN_ID_SOLANA } from "@certusone/wormhole-sdk";
import { TextField } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetSourceParsedTokens from "../../hooks/useGetSourceParsedTokenAccounts";
import {
  selectTransferSourceChain,
  selectTransferSourceParsedTokenAccount,
} from "../../store/selectors";
import {
  ParsedTokenAccount,
  setSourceParsedTokenAccount,
} from "../../store/transferSlice";
import EthereumSourceTokenSelector from "./EthereumSourceTokenSelector";
import SolanaSourceTokenSelector from "./SolanaSourceTokenSelector";

type TokenSelectorProps = {
  disabled: boolean;
};

export const TokenSelector = (props: TokenSelectorProps) => {
  const dispatch = useDispatch();

  const lookupChain = useSelector(selectTransferSourceChain);
  const sourceParsedTokenAccount = useSelector(
    selectTransferSourceParsedTokenAccount
  );
  const handleSolanaOnChange = useCallback(
    (newTokenAccount: ParsedTokenAccount | null) => {
      if (newTokenAccount !== undefined) {
        dispatch(setSourceParsedTokenAccount(newTokenAccount || undefined));
      }
    },
    [dispatch]
  );

  const maps = useGetSourceParsedTokens();

  const content =
    lookupChain === CHAIN_ID_SOLANA ? (
      <SolanaSourceTokenSelector
        value={sourceParsedTokenAccount || null}
        onChange={handleSolanaOnChange}
        accounts={maps?.tokenAccounts?.data || []}
        solanaTokenMap={maps?.tokenMap}
        metaplexData={maps?.metaplex}
      />
    ) : lookupChain === CHAIN_ID_ETH ? (
      <EthereumSourceTokenSelector
        value={sourceParsedTokenAccount || null}
        onChange={handleSolanaOnChange}
      />
    ) : (
      <TextField
        placeholder="Asset"
        fullWidth
        value={"hardcoded"}
        onChange={() => {}}
        disabled={true}
      />
    );

  return <div>{content}</div>;
};