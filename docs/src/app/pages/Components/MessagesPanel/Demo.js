import React from 'react';
// eslint-disable-next-line
import MessagesPanel from 'ringcentral-widgets/components/MessagesPanel';

const props = {};
props.currentLocale = 'en-US';
props.goToComposeText = () => null;
props.readVoicemail = () => null;
props.unmarkVoicemail = () => null;
props.markVoicemail = () => null;
props.showConversationDetail = () => null;
props.onClickToDial = () => null;
props.onViewContact = () => null;
props.onCreateContact = () => null;
props.brand = 'RingCentral';
props.textUnreadCounts = 0;
props.voiceUnreadCounts = 0;
props.conversations = [{
  id: 1,
  conversationId: '1',
  subject: 'subject text',
  correspondents: [{
    phoneNumber: '123456789',
  }],
  correspondentMatches: [],
  conversationMatches: [],
  unreadCounts: 0,
  type: 'SMS',
  creationTime: '2018-01-17T08:59:02.000Z',
}, {
  id: 2,
  conversationId: '2',
  subject: 'subject text2',
  correspondents: [{
    phoneNumber: '123456788',
  }],
  correspondentMatches: [],
  conversationMatches: [],
  unreadCounts: 1,
  type: 'SMS',
  creationTime: '2018-01-16T08:59:02.000Z',
}];
props.countryCode = '1';
props.areaCode = '657';
props.typeFilter = 'All';
props.dateTimeFormatter = ({ utcTimestamp }) => {
  const time = new Date(utcTimestamp);
  return `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;
};
/**
 * A example of `MessagesPanel`
 */
const MessagesPanelDemo = () => (
  <div style={{
    position: 'relative',
    height: '500px',
    width: '300px',
    border: '1px solid #f3f3f3',
  }}>
    <MessagesPanel
      {...props}
    />
  </div>
);
export default MessagesPanelDemo;
