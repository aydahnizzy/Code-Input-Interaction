function Frame2147225350() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center left-[204px] p-[10px] shadow-[0px_0px_0px_2px_#c0bcf5] top-[265px] w-[42px]">
      <p className="font-normal leading-[44px] not-italic relative shrink-0 text-[#070707] text-[34px] text-center w-full">1</p>
    </div>
  );
}

function Frame2147225352() {
  return <div className="absolute bg-white h-[56px] left-[206px] shadow-[0px_0px_0px_2px_#c0bcf5] top-[105px] w-[42px]" />;
}

function Frame2147225351() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center left-[204px] overflow-clip p-[10px] shadow-[0px_0px_0px_2px_#c0bcf5] top-[181px] w-[42px]">
      <p className="font-normal leading-[44px] not-italic relative shrink-0 text-[#070707] text-[34px] text-center w-full">1</p>
    </div>
  );
}

export default function Frame2147225470() {
  return (
    <div className="bg-[#f9f9f9] relative size-full">
      <Frame2147225350 />
      <Frame2147225352 />
      <Frame2147225351 />
      <p className="absolute font-normal leading-[19px] left-[76px] not-italic text-[#8d8d8d] text-[13px] text-nowrap top-[202px] whitespace-pre">Clicked/typing→</p>
      <p className="absolute font-normal leading-[19px] left-[128px] not-italic text-[#8d8d8d] text-[13px] text-nowrap top-[286px] whitespace-pre">Filled →</p>
      <p className="absolute font-normal leading-[19px] left-[116px] not-italic text-[#8d8d8d] text-[13px] text-nowrap top-[123px] whitespace-pre">Default →</p>
      <p className="absolute font-semibold leading-[22px] left-[calc(50%-60.5px)] not-italic text-[#8d8d8d] text-[15px] text-nowrap top-[21px] whitespace-pre">Code input state</p>
    </div>
  );
}