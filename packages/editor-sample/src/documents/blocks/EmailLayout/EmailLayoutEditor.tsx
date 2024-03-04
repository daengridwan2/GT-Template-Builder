import React from 'react';

import { useCurrentBlockId } from '../../editor/EditorBlock';
import { setDocument, setSelectedBlockId, useDocument } from '../../editor/EditorContext';
import EditorChildrenIds from '../helpers/EditorChildrenIds';

import { EmailLayoutProps } from './EmailLayoutPropsSchema';

function getFontFamily(fontFamily: EmailLayoutProps['fontFamily']) {
  const f = fontFamily ?? 'MODERN_SANS';
  switch (f) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
}

export default function EmailLayoutEditor(props: EmailLayoutProps) {
  const childrenIds = props.childrenIds ?? [];
  const document = useDocument();
  const currentBlockId = useCurrentBlockId();

  return (
    <div
      onClick={() => {
        setSelectedBlockId(null);
      }}
      style={{
        backgroundColor: props.backdropColor ?? '#EEEEEE',
        color: props.textColor ?? '#242424',
        fontFamily: getFontFamily(props.fontFamily),
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '0.15008px',
        lineHeight: '1.5',
        margin: '0',
        padding: '32px 0',
        minHeight: '100%',
        width: '100%',
        height: '100%',
      }}
    >
      <table
        align="center"
        width="100%"
        style={{
          margin: '0 auto',
          maxWidth: '600px',
          backgroundColor: props.canvasColor ?? '#FFFFFF',
        }}
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
      >
        <tbody>
          <tr style={{ width: '100%' }}>
            <td>
              <EditorChildrenIds
                childrenIds={childrenIds}
                onChange={({ block, blockId, childrenIds }) => {
                  setDocument({
                    [blockId]: block,
                    [currentBlockId]: {
                      type: 'Container',
                      data: {
                        ...document[currentBlockId].data,
                        props: { childrenIds: childrenIds },
                      },
                    },
                  });
                  setSelectedBlockId(blockId);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}