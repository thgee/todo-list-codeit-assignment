import Image from "next/image";
import logoSmall from "../public/imgs/logo-small.svg";
import logoLarge from "../public/imgs/logo-large.svg";
import Link from "next/link";
import { HOME_PAGE_ROUTE } from "../constants/routes";

const Gnb = () => {
  return (
    <>
      <nav className="flex h-[60px] items-center bg-white">
        <Link href={HOME_PAGE_ROUTE}>
          {/* 모바일 환경에서는 텍스트가 없는 로고 사용 */}
          <Image src={logoSmall} alt="logoSmall" className="tablet:hidden" />
          {/* 태블릿 이상에서는 텍스트가 있는 로고 사용 */}
          <Image
            src={logoLarge}
            alt="logoLarge"
            className="hidden tablet:block"
          />
        </Link>
      </nav>
      <div className="absolute left-0 h-[1px] w-[100%] bg-slate-200" />
    </>
  );
};

export default Gnb;
