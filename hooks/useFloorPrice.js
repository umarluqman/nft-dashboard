import { useQuery } from "react-query";
import x from "redaxios";

const getFloorPrice = async (collection, marketplace) => {
  const isMagicEden = marketplace === "magicEden";
  const isAlphaArt = marketplace === "alphaArt";
  const isDigitalEyes = marketplace === "digitalEyes";

  const { data } = await x.get(
    `${
      isMagicEden
        ? "https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/"
        : isAlphaArt
        ? "https://apis.alpha.art/api/v1/collection/"
        : "https://us-central1-digitaleyes-prod.cloudfunctions.net/offers-retriever"
    }${collection}
    `
    // {
    //   params: isDigitalEyes
    //     ? {
    //         collection,
    //       }
    //     : undefined,
    // }
  );
  return isMagicEden
    ? (data.results.floorPrice / 1000000000).toFixed(2)
    : (data.floorPrice / 1000000000).toFixed(2);
};

export function useFloorPrice({ collection, marketplace }) {
  return useQuery(["floor-price", collection, marketplace], () =>
    getFloorPrice(collection, marketplace)
  );
}
