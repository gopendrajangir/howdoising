import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import PageSection from 'components/PageSection';
import RecordBox from 'components/RecordBox';
import RecordForm from 'components/RecordForm';

const Audio = styled.audio`
  margin-bottom: 25px;
`

export default () => {
  const [file, setFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <PageSection center className="flex-col">
      <Audio style={{ display: showForm || showAudio ? 'block' : 'none' }} ref={audioRef} controls />
      {
        !showForm &&
        <RecordBox audioRef={audioRef} setShowForm={setShowForm} setShowAudio={setShowAudio} setFile={setFile} />
      }
      {
        showForm && file &&
        <RecordForm file={file} setShowForm={setShowForm} setShowAudio={setShowAudio} />
      }
    </PageSection>
  )
}