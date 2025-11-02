interface Props {
  results: kakao.maps.services.SearchedPlaceType[];
  onSelect: (place: kakao.maps.services.SearchedPlaceType) => void;
  showNoResult?: boolean;
}

export function MapSearchList({ results, onSelect }: Props) {
  return (
    <div className="absolute z-2 mt-2 max-h-80 min-w-full overflow-y-auto rounded-xl border bg-white shadow-md">
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.id}
            onClick={() => onSelect(result)}
            className="cursor-pointer px-4 py-2 hover:bg-[#FFE59E]"
          >
            <div>{result.place_name}</div>
            <div className="text-sm text-[#737373]">{result.address_name}</div>
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-[#737373]">검색 결과가 없어요</div>
      )}
    </div>
  );
}
