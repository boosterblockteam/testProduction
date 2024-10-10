"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function TawkToWidget() {
  useEffect(() => {
    const tawkChats = Array.from(document.getElementsByClassName("widget-visible") as HTMLCollectionOf<HTMLElement>);

    if (tawkChats.length > 0) {
      for (let i = 0; i < tawkChats.length; i++) {
        tawkChats[i].style.display = "block";
      }
    }

    return () => {
      const tawkChats = Array.from(document.getElementsByClassName("widget-visible") as HTMLCollectionOf<HTMLElement>);

      for (let i = 0; i < tawkChats.length; i++) {
        // tawkChats[i].remove();
        tawkChats[i].style.display = "none !important";
      }
    };
  }, []);

  return (
    <Script id="tawk" strategy="lazyOnload">
      {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/66ff07be37379df10df16bb3/1i9a3cg4a';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();

          Tawk_API.customStyle = {
            visibility: {
              desktop: {
                position: "br",
                xOffset: "60px",
                yOffset: 20,
              },
              mobile: {
                position: "br",
                xOffset: "20px",
                yOffset: "74px",
              },
              bubble: {
                rotate: "0deg",
                xOffset: -20,
                yOffset: 0,
              },
            },
          };
      `}
    </Script>
  );
}
