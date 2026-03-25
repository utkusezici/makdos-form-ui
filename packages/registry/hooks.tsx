import { useEffect, useRef, useState } from "react"

export function useOutSideClick(closeModal: any) {
  const wrapperRef = useRef(null);
  useOutSide(wrapperRef);
  function useOutSide(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return [wrapperRef];

}

export function useSelectbox(initialData: any[] = []): [any[], (data: any, value: string | number, text: string) => void] {
  const [allData, setAllData] = useState(() =>
    initialData.map((item: any) => ({
      value: item.value,
      text: item.text,
      otherInfo: item.otherInfo || item,
    }))
  );

  function configureSelectBoxItem(data: any, value: string | number, text: string) {
    if (data) {
      let configure: any = [];
      data.map((item: any) => {
        configure.push({
          value: item[value],
          text: item[text],
          otherInfo: item,
        });
      });
      setAllData(configure);
    }
  }

  return [allData, configureSelectBoxItem];
}

export function useMultipleSelectbox(): [any[], (data: any, value: string | number, text: string, checked: string | boolean) => void] {
  const [allData, setAllData] = useState([]);

  function configureSelectBoxItem(data: any, value: string | number, text: string, checked: string | boolean) {
    if (data) {
      let configure: any = [];
      data.map((item: any) => {
        configure.push({
          value: item[value],
          text: item[text],
          checked: typeof checked === "boolean" ? checked : item[checked],
          otherInfo: item
        });
      });
      setAllData(configure);
    }

  }

  return [allData, configureSelectBoxItem];
}

export function useSelectboxGroup(): [any[], (data: any, value: string | number, text: string, groupName: string) => void] {
  const [allData, setAllData] = useState([]);

  function configureSelectBoxItem(data: any, value: string | number, text: string, groupName: string) {
    if (data) {
      const groupArr = data.reduce((acc: any[], item: any) => {

        let group = acc.find((x: any) => x.group === item[groupName]); // Grubu bulmak için kontrol yapar
        if (!group) {  // Eğer grup yoksa, yeni grup oluşturur
          group = { group: item[groupName], items: [] };
          acc.push(group);
        }
        group.items.push({ // Grup içine itemları ekler
          value: item[value],
          text: item[text],
          group: item[groupName],
          otherInfo: item
        });
        return acc;
      }, []);

      setAllData(groupArr);
    }
  }

  return [allData, configureSelectBoxItem];
}

export interface WindowSizeState {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeState>({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

