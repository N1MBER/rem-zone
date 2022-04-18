import React from 'react';
import { cn } from '../../../__private__/utils/bem';

import './Logotype.scss';

const cnLogotype = cn('Logotype');

export const Logotype = () => {
  return (
    <svg
      width="222"
      height="39"
      viewBox="0 0 222 39"
      fill="none"
      className={cnLogotype()}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.48 8.6C42.464 8.6 44.1813 8.93067 45.632 9.592C47.104 10.2533 48.2347 11.192 49.024 12.408C49.8133 13.624 50.208 15.064 50.208 16.728C50.208 18.3707 49.8133 19.8107 49.024 21.048C48.2347 22.264 47.104 23.2027 45.632 23.864C44.1813 24.504 42.464 24.824 40.48 24.824H35.968V31H30.784V8.6H40.48ZM40.192 20.6C41.7493 20.6 42.9333 20.2693 43.744 19.608C44.5547 18.9253 44.96 17.9653 44.96 16.728C44.96 15.4693 44.5547 14.5093 43.744 13.848C42.9333 13.1653 41.7493 12.824 40.192 12.824H35.968V20.6H40.192ZM69.9485 22.456C69.9485 22.52 69.9165 22.968 69.8525 23.8H56.8285C57.0632 24.8667 57.6178 25.7093 58.4925 26.328C59.3672 26.9467 60.4552 27.256 61.7565 27.256C62.6525 27.256 63.4418 27.128 64.1245 26.872C64.8285 26.5947 65.4792 26.168 66.0765 25.592L68.7325 28.472C67.1112 30.328 64.7432 31.256 61.6285 31.256C59.6872 31.256 57.9698 30.8827 56.4765 30.136C54.9832 29.368 53.8312 28.312 53.0205 26.968C52.2098 25.624 51.8045 24.0987 51.8045 22.392C51.8045 20.7067 52.1992 19.192 52.9885 17.848C53.7992 16.4827 54.8978 15.4267 56.2845 14.68C57.6925 13.912 59.2605 13.528 60.9885 13.528C62.6738 13.528 64.1992 13.8907 65.5645 14.616C66.9298 15.3413 67.9965 16.3867 68.7645 17.752C69.5538 19.096 69.9485 20.664 69.9485 22.456ZM61.0205 17.304C59.8898 17.304 58.9405 17.624 58.1725 18.264C57.4045 18.904 56.9352 19.7787 56.7645 20.888H65.2445C65.0738 19.8 64.6045 18.936 63.8365 18.296C63.0685 17.6347 62.1298 17.304 61.0205 17.304ZM90.575 31V20.696L85.423 29.336H83.311L78.287 20.664V31H73.775V13.784H78.991L84.495 23.736L90.351 13.784H95.023L95.087 31H90.575ZM202.698 26.296H199.05V31H193.994V26.296H181.93V22.808L192.49 8.6H197.93L188.138 22.072H194.154V17.88H199.05V22.072H202.698V26.296ZM220.44 8.6V11.96L212.12 31H206.488L214.52 12.824H207.096V16.472H202.488V8.6H220.44Z"
        fill="var(--color-typo-primary)"
      />
      <path
        d="M112.989 19.32C114.29 19.768 115.303 20.472 116.029 21.432C116.775 22.3707 117.149 23.4693 117.149 24.728C117.149 26.0933 116.701 27.2773 115.805 28.28C114.909 29.2827 113.693 30.0507 112.157 30.584C110.642 31.1173 108.978 31.384 107.165 31.384C105.629 31.384 104.093 31.192 102.557 30.808C101.042 30.424 99.6021 29.8373 98.2368 29.048L99.8368 25.336C100.818 25.9333 101.895 26.392 103.069 26.712C104.263 27.0107 105.426 27.16 106.557 27.16C108.093 27.16 109.362 26.8827 110.365 26.328C111.389 25.7733 111.901 24.9947 111.901 23.992C111.901 23.16 111.549 22.5307 110.845 22.104C110.162 21.6773 109.223 21.464 108.029 21.464H102.557V17.56H107.645C108.69 17.56 109.501 17.3467 110.077 16.92C110.674 16.4933 110.973 15.9067 110.973 15.16C110.973 14.2853 110.546 13.6027 109.693 13.112C108.861 12.6213 107.783 12.376 106.461 12.376C105.479 12.376 104.466 12.5147 103.421 12.792C102.375 13.048 101.383 13.4427 100.445 13.976L98.8768 9.944C101.245 8.728 103.805 8.12 106.557 8.12C108.306 8.12 109.917 8.376 111.389 8.888C112.861 9.4 114.034 10.1467 114.909 11.128C115.783 12.1093 116.221 13.2507 116.221 14.552C116.221 15.6187 115.933 16.568 115.357 17.4C114.781 18.232 113.991 18.872 112.989 19.32ZM128.933 31.256C127.119 31.256 125.487 30.8827 124.037 30.136C122.607 29.368 121.487 28.312 120.677 26.968C119.866 25.624 119.461 24.0987 119.461 22.392C119.461 20.6853 119.866 19.16 120.677 17.816C121.487 16.472 122.607 15.4267 124.037 14.68C125.487 13.912 127.119 13.528 128.933 13.528C130.746 13.528 132.367 13.912 133.797 14.68C135.226 15.4267 136.346 16.472 137.157 17.816C137.967 19.16 138.373 20.6853 138.373 22.392C138.373 24.0987 137.967 25.624 137.157 26.968C136.346 28.312 135.226 29.368 133.797 30.136C132.367 30.8827 130.746 31.256 128.933 31.256ZM128.933 27.16C130.213 27.16 131.258 26.7333 132.069 25.88C132.901 25.0053 133.317 23.8427 133.317 22.392C133.317 20.9413 132.901 19.7893 132.069 18.936C131.258 18.0613 130.213 17.624 128.933 17.624C127.653 17.624 126.597 18.0613 125.765 18.936C124.933 19.7893 124.517 20.9413 124.517 22.392C124.517 23.8427 124.933 25.0053 125.765 25.88C126.597 26.7333 127.653 27.16 128.933 27.16ZM141.806 13.784H146.766V20.504H154.254V13.784H159.246V31H154.254V24.568H146.766V31H141.806V13.784ZM170.713 13.528C173.38 13.528 175.428 14.168 176.857 15.448C178.286 16.7067 179.001 18.616 179.001 21.176V31H174.329V28.856C173.39 30.456 171.641 31.256 169.081 31.256C167.758 31.256 166.606 31.032 165.625 30.584C164.665 30.136 163.929 29.5173 163.417 28.728C162.905 27.9387 162.649 27.0427 162.649 26.04C162.649 24.44 163.246 23.1813 164.441 22.264C165.657 21.3467 167.524 20.888 170.041 20.888H174.009C174.009 19.8 173.678 18.968 173.017 18.392C172.356 17.7947 171.364 17.496 170.041 17.496C169.124 17.496 168.217 17.6453 167.321 17.944C166.446 18.2213 165.7 18.6053 165.081 19.096L163.289 15.608C164.228 14.9467 165.348 14.4347 166.649 14.072C167.972 13.7093 169.326 13.528 170.713 13.528ZM170.329 27.896C171.182 27.896 171.94 27.704 172.601 27.32C173.262 26.9147 173.732 26.328 174.009 25.56V23.8H170.585C168.537 23.8 167.513 24.472 167.513 25.816C167.513 26.456 167.758 26.968 168.249 27.352C168.761 27.7147 169.454 27.896 170.329 27.896Z"
        fill="var(--color-bg-brand)"
      />
      <circle
        cx="11"
        cy="15"
        r="10"
        stroke="var(--color-bg-brand)"
        strokeWidth="2"
      />
      <path
        d="M10.7082 37.4088L3.67263 27.3834C3.34982 26.9234 3.98986 26.25 4.49401 26.4982C8.70243 28.5701 13.202 28.5334 17.8689 26.2122C18.3563 25.9697 18.9247 26.5748 18.6177 27.0244L11.5304 37.4035C11.3334 37.692 10.9089 37.6947 10.7082 37.4088Z"
        fill="var(--color-bg-brand)"
      />
      <path
        d="M9.43187 19.196C9.43987 19.132 9.44587 19.068 9.44587 19C9.44587 18.932 9.43987 18.868 9.43187 18.804L9.85387 18.474C9.89187 18.444 9.90187 18.39 9.87787 18.346L9.47787 17.654C9.45387 17.61 9.39987 17.594 9.35587 17.61L8.85787 17.81C8.75387 17.73 8.64187 17.664 8.51987 17.614L8.44387 17.084C8.43787 17.036 8.39587 17 8.34587 17H7.54587C7.49587 17 7.45387 17.036 7.44787 17.084L7.37187 17.614C7.24987 17.664 7.13787 17.732 7.03387 17.81L6.53587 17.61C6.48987 17.592 6.43787 17.61 6.41387 17.654L6.01387 18.346C5.98787 18.39 5.99987 18.444 6.03787 18.474L6.45987 18.804C6.45187 18.868 6.44587 18.934 6.44587 19C6.44587 19.066 6.45187 19.132 6.45987 19.196L6.03787 19.526C5.99987 19.556 5.98987 19.61 6.01387 19.654L6.41387 20.346C6.43787 20.39 6.49187 20.406 6.53587 20.39L7.03387 20.19C7.13787 20.27 7.24987 20.336 7.37187 20.386L7.44787 20.916C7.45387 20.964 7.49587 21 7.54587 21H8.34587C8.39587 21 8.43787 20.964 8.44387 20.916L8.51987 20.386C8.64187 20.336 8.75387 20.268 8.85787 20.19L9.35587 20.39C9.40187 20.408 9.45387 20.39 9.47787 20.346L9.87787 19.654C9.90187 19.61 9.89187 19.556 9.85387 19.526L9.43187 19.196ZM7.94587 19.7C7.55987 19.7 7.24587 19.386 7.24587 19C7.24587 18.614 7.55987 18.3 7.94587 18.3C8.33187 18.3 8.64587 18.614 8.64587 19C8.64587 19.386 8.33187 19.7 7.94587 19.7Z"
        fill="var(--color-typo-primary)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.76416 8H8.45416L8.06743 9.03128C7.56851 9.18694 7.11764 9.45146 6.7426 9.79703L5.655 9.61613L5 10.7506L5.69989 11.6014C5.64484 11.8477 5.6158 12.1038 5.6158 12.3667C5.6158 12.6296 5.64485 12.8857 5.69991 13.1321L5.00003 13.9828L5.65503 15.1173L6.74266 14.9363C7.11768 15.2819 7.56852 15.5464 8.0674 15.702L8.45415 16.7334H9.76415L10.1509 15.702C10.6497 15.5464 11.1006 15.2819 11.4756 14.9364L12.5633 15.1173L13.2183 13.9828L12.5184 13.132C12.5734 12.8857 12.6025 12.6296 12.6025 12.3667C12.6025 12.1037 12.5734 11.8476 12.5184 11.6013L13.2183 10.7505L12.5633 9.61602L11.4756 9.79694C11.1006 9.45143 10.6498 9.18695 10.1509 9.0313L9.76416 8ZM10.8559 12.3667C10.8559 13.3314 10.0739 14.1134 9.10922 14.1134C8.14456 14.1134 7.36255 13.3314 7.36255 12.3667C7.36255 11.4021 8.14456 10.6201 9.10922 10.6201C10.0739 10.6201 10.8559 11.4021 10.8559 12.3667Z"
        fill="var(--color-typo-primary)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9125 14.1133H14.7858L15.1148 15.1002C15.5006 15.2179 15.8486 15.4223 16.1362 15.6906L17.1561 15.4819L17.5927 16.2382L16.9025 17.0166C16.9462 17.2062 16.9692 17.4037 16.9692 17.6066C16.9692 17.8095 16.9462 18.007 16.9025 18.1966L17.5929 18.9751L17.1562 19.7314L16.1361 19.5227C15.8486 19.791 15.5006 19.9953 15.1148 20.113L14.7858 21.1H13.9124L13.5834 20.1129C13.1977 19.9952 12.8498 19.7909 12.5623 19.5227L11.5422 19.7314L11.1055 18.9751L11.7959 18.1965C11.7523 18.0069 11.7292 17.8095 11.7292 17.6066C11.7292 17.4037 11.7523 17.2062 11.7959 17.0166L11.1056 16.2381L11.5422 15.4818L12.5623 15.6905C12.8498 15.4223 13.1978 15.218 13.5835 15.1003L13.9125 14.1133ZM15.2225 17.6067C15.2225 18.089 14.8315 18.48 14.3491 18.48C13.8668 18.48 13.4758 18.089 13.4758 17.6067C13.4758 17.1244 13.8668 16.7334 14.3491 16.7334C14.8315 16.7334 15.2225 17.1244 15.2225 17.6067Z"
        fill="var(--color-typo-primary)"
      />
    </svg>
  );
};