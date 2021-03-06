import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import Header from '../Header';
import Panel from '../Panel';
import Line from '../Line';
import LinkLine from '../LinkLine';
import IconLine from '../IconLine';
import Eula from '../Eula';
import SpinnerOverlay from '../SpinnerOverlay';
import PresenceSettingSection from '../PresenceSettingSection';
import styles from './styles.scss';
import Switch from '../Switch';
import InputLine from '../InputLine';
import LocalePicker from '../LocalePicker';
import i18n from './i18n';


export default function SettingsPanel({
  children,
  className,
  onLogoutButtonClick,
  loginNumber,
  version,
  currentLocale,
  brandId,
  EulaRenderer,
  onCallingSettingsLinkClick,
  onRegionSettingsLinkClick,
  onAudioSettingsLinkClick,
  onFeedbackSettingsLinkClick,
  showCalling,
  showAutoLog,
  showAudio,
  autoLogEnabled,
  onAutoLogChange,
  showAutoLogSMS,
  autoLogSMSEnabled,
  onAutoLogSMSChange,
  showClickToDial,
  clickToDialEnabled,
  onClickToDialChange,
  showRegion,
  showHeader,
  ringoutEnabled,
  outboundSMS,
  showSpinner,
  dndStatus,
  userStatus,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  toggleAcceptCallQueueCalls,
  isCallQueueMember,
  showPresenceSettings,
  showAudioSettings,
  additional,
  supportedLocales,
  savedLocale,
  saveLocale,
}) {
  if (showSpinner) {
    return (
      <SpinnerOverlay />
    );
  }

  const locale = supportedLocales && supportedLocales.length > 1 && (
    <InputLine
      label={i18n.getString('language', currentLocale)}
    >
      <LocalePicker
        value={savedLocale}
        onChange={saveLocale}
        options={supportedLocales}
      />
    </InputLine>
  );

  const region = showRegion ?
    (
      <LinkLine
        onClick={onRegionSettingsLinkClick} >
        {i18n.getString('region', currentLocale)}
      </LinkLine>
    ) :
    null;

  const calling = showCalling
    ? (
      <LinkLine
        onClick={onCallingSettingsLinkClick} >
        {i18n.getString('calling', currentLocale)}
      </LinkLine>
    )
    : null;
  const audio = showAudio
    ? (
      <LinkLine
        onClick={onAudioSettingsLinkClick} >
        {i18n.getString('audio', currentLocale)}
      </LinkLine>
    )
    : null;
  const presenceSetting = (dndStatus && userStatus) ?
    (
      <PresenceSettingSection
        currentLocale={currentLocale}
        dndStatus={dndStatus}
        userStatus={userStatus}
        isCallQueueMember={isCallQueueMember}
        setAvailable={setAvailable}
        setBusy={setBusy}
        setDoNotDisturb={setDoNotDisturb}
        setInvisible={setInvisible}
        toggleAcceptCallQueueCalls={toggleAcceptCallQueueCalls}
        showPresenceSettings={showPresenceSettings}
      />
    ) :
    null;
  let clickToDialText;
  if (outboundSMS && ringoutEnabled) {
    clickToDialText = i18n.getString('clickToDialSMS', currentLocale);
  } else if (!outboundSMS && ringoutEnabled) {
    clickToDialText = i18n.getString('clickToDial', currentLocale);
  } else if (outboundSMS && !ringoutEnabled) {
    clickToDialText = i18n.getString('clickToSMS', currentLocale);
  } else {
    clickToDialText = '';
  }
  const clickToDial = showClickToDial && (
    outboundSMS || ringoutEnabled) ?
    (
      <IconLine
        icon={
          <Switch
            checked={clickToDialEnabled}
            onChange={onClickToDialChange}
          />
        }
      >
        {clickToDialText}
      </IconLine>
    ) :
    null;
  const autoLog = showAutoLog ? (
    <IconLine
      icon={
        <Switch
          checked={autoLogEnabled}
          onChange={onAutoLogChange}
        />
      }
    >
      {i18n.getString('autoLogCalls', currentLocale)}
    </IconLine>
  ) :
    null;
  const autoLogSMS = showAutoLogSMS ? (
    <IconLine
      icon={
        <Switch
          checked={autoLogSMSEnabled}
          onChange={onAutoLogSMSChange}
        />
      }
    >
      {i18n.getString('autoLogSMS', currentLocale)}
    </IconLine>
  ) :
    null;
  const header = showHeader ? (
    <Header>
      {i18n.getString('settings', currentLocale)}
    </Header>
  ) : null;
  return (
    <div className={classnames(styles.root, className)}>
      {header}
      <Panel
        className={classnames(
          styles.content,
          showHeader && styles.contentWithHeader,
        )}>
        {locale}
        {calling}
        {region}
        {audio}
        {presenceSetting}
        {children}
        {autoLog}
        {autoLogSMS}
        {clickToDial}
        {additional}
        <LinkLine
          onClick={onFeedbackSettingsLinkClick} >
          {i18n.getString('feedback', currentLocale)}
        </LinkLine>
        <section className={styles.section}>
          <Line>
            <EulaRenderer
              className={styles.eula}
              currentLocale={currentLocale}
              brandId={brandId} />
          </Line>
        </section>
        <section className={styles.section}>
          <IconLine
            onClick={onLogoutButtonClick}
            icon={
              <span className={dynamicsFont.logout} />
            } >
            {i18n.getString('logout', currentLocale)}
            <span className={styles.loginNumber}>
              {` ${loginNumber}`}
            </span>
          </IconLine>
        </section>
        <div className={styles.versionContainer} >
          {i18n.getString('version', currentLocale)} {version}
        </div>
      </Panel>
    </div>
  );
}

SettingsPanel.propTypes = {
  brandId: PropTypes.string.isRequired,
  onCallingSettingsLinkClick: PropTypes.func.isRequired,
  onAudioSettingsLinkClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  EulaRenderer: PropTypes.func,
  loginNumber: PropTypes.string.isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  onRegionSettingsLinkClick: PropTypes.func.isRequired,
  showCalling: PropTypes.bool,
  showRegion: PropTypes.bool,
  showAudio: PropTypes.bool,
  showAutoLog: PropTypes.bool,
  autoLogEnabled: PropTypes.bool,
  onAutoLogChange: PropTypes.func,
  showAutoLogSMS: PropTypes.bool,
  autoLogSMSEnabled: PropTypes.bool,
  onAutoLogSMSChange: PropTypes.func,
  showClickToDial: PropTypes.bool,
  clickToDialEnabled: PropTypes.bool,
  onClickToDialChange: PropTypes.func,
  version: PropTypes.string.isRequired,
  showHeader: PropTypes.bool,
  ringoutEnabled: PropTypes.bool,
  outboundSMS: PropTypes.bool,
  showSpinner: PropTypes.bool,
  dndStatus: PropTypes.string,
  userStatus: PropTypes.string,
  isCallQueueMember: PropTypes.bool,
  setAvailable: PropTypes.func,
  setBusy: PropTypes.func,
  setDoNotDisturb: PropTypes.func,
  setInvisible: PropTypes.func,
  toggleAcceptCallQueueCalls: PropTypes.func,
  showPresenceSettings: PropTypes.bool,
  showAudioSettings: PropTypes.bool,
  additional: PropTypes.node,
  supportedLocales: PropTypes.arrayOf(PropTypes.string),
  savedLocale: PropTypes.string,
  saveLocale: PropTypes.func,
  onFeedbackSettingsLinkClick: PropTypes.func.isRequired,
};
SettingsPanel.defaultProps = {
  className: null,
  EulaRenderer: Eula,
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  onClickToDialChange: undefined,
  showCalling: false,
  showAudio: false,
  showAutoLog: false,
  showRegion: false,
  autoLogEnabled: false,
  onAutoLogChange: undefined,
  showAutoLogSMS: false,
  autoLogSMSEnabled: false,
  onAutoLogSMSChange: undefined,
  showHeader: false,
  ringoutEnabled: false,
  outboundSMS: false,
  showSpinner: false,
  dndStatus: undefined,
  userStatus: undefined,
  isCallQueueMember: false,
  setAvailable: () => null,
  setBusy: () => null,
  setDoNotDisturb: () => null,
  setInvisible: () => null,
  toggleAcceptCallQueueCalls: () => null,
  showPresenceSettings: false,
  showAudioSettings: true,
  additional: null,
  supportedLocales: undefined,
  savedLocale: undefined,
  saveLocale: undefined,
};
