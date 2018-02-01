import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  state('in', style({ opacity: '1' })),
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate('.3s ease')
  ]),
  transition('* => void', [
    style({ height: '*' }),
    animate('.3s ease', style({
      opacity: 0,
    }))
  ])
]);
