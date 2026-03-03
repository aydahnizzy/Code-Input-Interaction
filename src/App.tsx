import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { useWebHaptics } from "web-haptics/react";
import svgPaths from "./imports/svg-bafvfz9frf";

function MoonIcon() {
  return (
    <div className="h-[28px] relative shrink-0 w-[27px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 28">
        <path d={svgPaths.p781a2c0} fill="var(--fill-0, #2A2A2A)" />
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-semibold leading-[32px] min-w-full relative shrink-0 text-[#2a2a2a] text-[24px] tracking-[-0.2px] w-[min-content]">
        Check your email
      </p>
      <p className="font-normal leading-[19px] relative shrink-0 text-[#8d8d8d] text-[14px] w-[316px]">
        <span>{`We just sent a code to `}</span>
        <span className="font-medium not-italic text-[#2a2a2a]">
          ayo@gmail.com
        </span>
        , please check and enter the code in the input below. It expires within 10minutes.
      </p>
    </div>
  );
}

interface CodeDigitProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  hasError: boolean;
}

function CodeDigit({ value, onChange, onKeyDown, onFocus, inputRef, hasError }: CodeDigitProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      onChange(val.slice(-1)); // Only take the last digit
    }
  };

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center p-[10px] relative shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_2px_#c0bcf5] transition-shadow">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
      />
    </div>
  );
}

interface CodeInputGroupProps {
  digits: string[];
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  inputRefs: React.RefObject<HTMLInputElement>[];
  hasError: boolean;
  startIndex: number;
  rounded?: "left" | "right" | "none";
}

function CodeInputGroup({ digits, onChange, onKeyDown, inputRefs, hasError, startIndex, rounded = "none" }: CodeInputGroupProps) {
  return (
    <div className="content-stretch flex items-center relative rounded-[6px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
      <div className={`bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center p-[10px] relative shrink-0 w-[42px] ${rounded === "left" ? "rounded-bl-[6px] rounded-tl-[6px]" : ""} focus-within:shadow-[0px_0px_0px_2px_#c0bcf5] transition-shadow`}>
        <input
          ref={inputRefs[startIndex]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[startIndex]}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              onChange(startIndex, val.slice(-1));
            }
          }}
          onKeyDown={(e) => onKeyDown(startIndex, e)}
          className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
        />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#e6e6e6] h-full shrink-0 w-px" />
      </div>
      <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center p-[10px] relative shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_2px_#c0bcf5] transition-shadow">
        <input
          ref={inputRefs[startIndex + 1]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[startIndex + 1]}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              onChange(startIndex + 1, val.slice(-1));
            }
          }}
          onKeyDown={(e) => onKeyDown(startIndex + 1, e)}
          className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
        />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="bg-[#e6e6e6] h-full shrink-0 w-px" />
      </div>
      <div className={`bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center p-[10px] relative shrink-0 w-[42px] ${rounded === "right" ? "rounded-br-[6px] rounded-tr-[6px]" : ""} focus-within:shadow-[0px_0px_0px_2px_#c0bcf5] transition-shadow`}>
        <input
          ref={inputRefs[startIndex + 2]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[startIndex + 2]}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              onChange(startIndex + 2, val.slice(-1));
            }
          }}
          onKeyDown={(e) => onKeyDown(startIndex + 2, e)}
          className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

export default function App() {
  const { trigger } = useWebHaptics();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [hasError, setHasError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleDigitChange = (index: number, value: string) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setHasError(false);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleConfirm = () => {
    trigger();
    const code = digits.join("");
    if (code.length === 6) {
      if (code === "123456") {
        alert("Code verified successfully!");
      } else {
        setHasError(true);
        setIsShaking(true);
        trigger([
          { duration: 40 },
          { delay: 40, duration: 40 },
          { delay: 40, duration: 40 },
        ], { intensity: 0.9 });
        setTimeout(() => setIsShaking(false), 500);
      }
    }
  };

  const handleResend = () => {
    trigger();
    alert("Code resent!");
    setDigits(["", "", "", "", "", ""]);
    setHasError(false);
    inputRefs[0].current?.focus();
  };

  const isComplete = digits.every((digit) => digit !== "");

  return (
    <div className="relative size-full min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]">
        <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
          <MoonIcon />
          <Header />
        </div>

        <div className={`content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
            <div className="content-stretch flex gap-[3px] items-center relative rounded-[6px] shrink-0 bg-[rgb(255,255,255)]">
              <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[10px] relative rounded-bl-[6px] rounded-tl-[6px] shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_3px_rgba(100,94,245,0.4)]">
                <input
                  ref={inputRefs[0]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[0]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      handleDigitChange(0, val.slice(-1));
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(0, e)}
                  className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#e6e6e6] h-[56px] shrink-0 w-px" />
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_3px_rgba(100,94,245,0.4)]">
                <input
                  ref={inputRefs[1]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[1]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      handleDigitChange(1, val.slice(-1));
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(1, e)}
                  className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#e6e6e6] h-[56px] shrink-0 w-px" />
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[10px] relative rounded-br-[6px] rounded-tr-[6px] shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_3px_rgba(100,94,245,0.4)]">
                <input
                  ref={inputRefs[2]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[2]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      handleDigitChange(2, val.slice(-1));
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(2, e)}
                  className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="bg-[#d9d9d9] h-[2px] shrink-0 w-[10px]" />
            <div className="content-stretch flex gap-[3px] items-center relative rounded-[6px] shrink-0 bg-[rgb(255,255,255)]">
              <div aria-hidden="true" className="absolute border border-[#e6e6e6] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[10px] relative rounded-bl-[6px] rounded-tl-[6px] shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_3px_rgba(100,94,245,0.4)]">
                <input
                  ref={inputRefs[3]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[3]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      handleDigitChange(3, val.slice(-1));
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(3, e)}
                  className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#e6e6e6] h-[56px] shrink-0 w-px" />
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_3px_rgba(100,94,245,0.4)]">
                <input
                  ref={inputRefs[4]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[4]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      handleDigitChange(4, val.slice(-1));
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(4, e)}
                  className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
                />
              </div>
              <div className="bg-[#e6e6e6] h-[56px] shrink-0 w-px" />
              <div className="bg-white box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[10px] relative rounded-br-[6px] rounded-tr-[6px] shrink-0 w-[42px] focus-within:shadow-[0px_0px_0px_3px_rgba(100,94,245,0.4)]">
                <input
                  ref={inputRefs[5]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digits[5]}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      handleDigitChange(5, val.slice(-1));
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(5, e)}
                  className="font-normal leading-[44px] not-italic text-[#070707] text-[34px] text-center w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
          {hasError && (
            <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
              <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[#9e0a05] text-[13px] text-nowrap tracking-[0.1px] whitespace-pre">
                Invalid code, please try again
              </p>
            </div>
          )}
        </div>

        <div className="content-stretch flex flex-col gap-[8px] h-[88px] items-start relative shrink-0 w-full">
          <button
            onClick={handleConfirm}
            disabled={!isComplete}
            className="bg-[#645ef5] h-[40px] relative rounded-[6px] shrink-0 w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[#5651e0] transition-colors"
          >
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative w-full">
                <p className="font-medium leading-[19px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
                  Confirm
                </p>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[0px_-0.5px_0px_0.3px_inset_rgba(0,0,0,0.15)]" />
          </button>

          <button
            onClick={handleResend}
            className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full cursor-pointer hover:bg-[#f5f5f5] transition-colors"
          >
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="box-border content-stretch flex gap-[4px] h-[40px] items-center justify-center px-[16px] py-[8px] relative w-full">
                <p className="font-medium leading-[19px] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#2a2a2a] text-[14px] text-nowrap whitespace-pre">
                  Resend code
                </p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#e6e6e6] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_5px_0px_rgba(61,59,53,0.05),0px_0px_0px_0.5px_rgba(61,59,53,0.1),0px_1px_1px_0px_rgba(0,0,0,0.1)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
