import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const WalletSVG = ({ width = 24, height = 24, stroke = "#fff", fill = "none", className, onClick = () => {} }: Props): React.ReactElement => {
  return (
    <svg height={height} width={width} fill={fill} onClick={onClick} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g id="Icons/wallet">
        <path
          id="Vector"
          d="M5.22266 5.68751H22.7227C22.9271 5.68741 23.1313 5.70038 23.3341 5.72633C23.2653 5.24387 23.0996 4.78031 22.8469 4.36362C22.5942 3.94694 22.2597 3.58574 21.8636 3.30182C21.4675 3.0179 21.018 2.81713 20.5422 2.71162C20.0664 2.60611 19.5742 2.59804 19.0952 2.6879L4.70312 5.14501H4.68672C3.78332 5.31776 2.97996 5.82889 2.4407 6.57399C3.25314 5.99612 4.22567 5.68622 5.22266 5.68751ZM22.7227 7.00001H5.22266C4.29471 7.00102 3.40506 7.37009 2.7489 8.02625C2.09274 8.68241 1.72367 9.57206 1.72266 10.5V21C1.72367 21.928 2.09274 22.8176 2.7489 23.4738C3.40506 24.1299 4.29471 24.499 5.22266 24.5H22.7227C23.6506 24.499 24.5403 24.1299 25.1964 23.4738C25.8526 22.8176 26.2216 21.928 26.2227 21V10.5C26.2216 9.57206 25.8526 8.68241 25.1964 8.02625C24.5403 7.37009 23.6506 7.00102 22.7227 7.00001ZM20.125 17.5C19.7789 17.5 19.4405 17.3974 19.1528 17.2051C18.865 17.0128 18.6407 16.7395 18.5082 16.4197C18.3758 16.0999 18.3411 15.7481 18.4086 15.4086C18.4762 15.0691 18.6428 14.7573 18.8876 14.5126C19.1323 14.2678 19.4441 14.1012 19.7836 14.0336C20.1231 13.9661 20.4749 14.0008 20.7947 14.1332C21.1145 14.2657 21.3878 14.49 21.5801 14.7778C21.7724 15.0655 21.875 15.4039 21.875 15.75C21.875 16.2141 21.6906 16.6593 21.3624 16.9874C21.0342 17.3156 20.5891 17.5 20.125 17.5Z"
          fill={fill}
        />
        <path
          id="Vector_2"
          d="M1.75 14.1914V8.75C1.75 7.56492 2.40625 5.57812 4.68398 5.14773C6.61719 4.78516 8.53125 4.78516 8.53125 4.78516C8.53125 4.78516 9.78906 5.66016 8.75 5.66016C7.71094 5.66016 7.73828 7 8.75 7C9.76172 7 8.75 8.28516 8.75 8.28516L4.67578 12.9062L1.75 14.1914Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default WalletSVG;
