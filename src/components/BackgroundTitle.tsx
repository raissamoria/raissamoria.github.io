import { forwardRef } from 'react';
import { MoriaSurfLettering, WordmarkStyle } from './MoriaSurfLettering';

interface BackgroundTitleProps {
  text?: string;
  className?: string;
  defaultStyle?: WordmarkStyle;
  showStyleSelector?: boolean;
  onStyleChange?: (style: WordmarkStyle) => void;
}

export const BackgroundTitle = forwardRef<HTMLDivElement, BackgroundTitleProps>(
  ({ className = "", defaultStyle = 'white-3d', showStyleSelector = true, onStyleChange }, ref) => {
    return (
      <div 
        ref={ref}
        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none z-10 px-4 md:px-12 ${className}`}
      >
        <div className="w-full flex flex-col items-center justify-center my-auto">
          <MoriaSurfLettering 
            defaultStyle={defaultStyle}
            showStyleSelector={showStyleSelector}
            onStyleChange={onStyleChange}
          />
        </div>
      </div>
    );
  }
);

BackgroundTitle.displayName = 'BackgroundTitle';
