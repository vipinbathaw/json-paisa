import { useState } from 'react';
import { TX_TYPE } from '../../configs';

const PopularTags = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  let popularTags = {};

  for (let i = 0; i < props.data.ledger.length; i++) {
    let entry = props.data.ledger[i];
    // for popular tags
    for (let j = 0; j < entry.tags.length; j++) {
      let tag = entry.tags[j];
      if (popularTags[tag] === undefined) {
        popularTags[tag] = { credit: 0, debit: 0, count: 0 };
      }
      if (entry.type === TX_TYPE.CREDIT) {
        popularTags[tag].credit += parseFloat(entry.value);
      } else {
        popularTags[tag].debit += parseFloat(entry.value);
      }
      popularTags[tag].count += 1;
    }
  }

  const popularTagsArray = Object.entries(popularTags)
    .map(([key, { credit, debit, count }]) => ({ key, credit, debit, count }))
    .sort((a, b) => b.credit + b.debit - (a.credit + a.debit));

  return (
    <div className="box">
      <div className="row row-v-center">
        <h2>Popular Tags</h2>
        <div
          className="collapser right"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <span>+</span> : <span>-</span>}
        </div>
      </div>
      <div className={collapsed ? 'gone' : 'content popular-tags'}>
        <div className="row">
          <div>
            <h5>Tag</h5>
          </div>
          <div>
            <h5>Count</h5>
          </div>
          <div>
            <h5>Credit</h5>
          </div>
          <div>
            <h5>Debit</h5>
          </div>
        </div>
        {popularTagsArray.map((tag, i) => (
          <div className="row" key={i}>
            <div>
              <span>{tag.key}</span>
            </div>
            <div>
              <span>{tag.count}</span>
            </div>
            <div>
              <span className="credit">{tag.credit}</span>
            </div>
            <div>
              <span className="debit">{tag.debit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
