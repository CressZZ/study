import {useEffect, useRef, useState, useSyncExternalStore, useTransition} from 'react';
import { ExpensiveComponent } from './ExpensiveComponent';
import ClickCounter from './ClickCounter'
import InputComponent from './InputComponent';

window.count = 0;

setInterval(() => {
  window.count++;
}, 1);

export default function TestComponent(){


  return (
    <div>
        <ClickCounter />
        <InputComponent />
    </div>
  )
}

