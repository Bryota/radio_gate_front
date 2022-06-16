import axios from '../../../settings/Axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button } from '../../../components/Elements';
import { Input, CheckBox, Textarea, Select } from '../../../components/Form';
import '../../../assets/css/components/pagination.css';

type SelectItemType = {
    id: number
    name: string
    content?: string
    created_at: string
    updated_at: string
}

export const MessagePost = () => {
    const search = useLocation().search;
    const getParams = new URLSearchParams(search);
    const [isMyRadioProgram, setIsMyRadioProgram] = useState<boolean>(false);
    const [isUsedMessageTemplate, setIsUsedMessageTemplate] = useState<boolean>(false);
    const [isSentListenerinfo, setIsSentListenerinfo] = useState<boolean>(false);
    const [isSentTel, setIsSentTel] = useState<boolean>(false);
    const [radioStations, setRadioStations] = useState<SelectItemType[]>();
    const [radioPrograms, setRadioPrograms] = useState<SelectItemType[]>();
    const [corners, setCorners] = useState<SelectItemType[]>();
    const [messageTemplates, setMessageTemplates] = useState<SelectItemType[]>([]);
    const [radioStationId, setRadioStationId] = useState<string>();
    const [radioProgramId, setRadioProgramId] = useState<string>();
    const [programCornerId, setProgramCornerId] = useState<string>();
    const [subject, setSubject] = useState<string>();
    const [content, setContent] = useState<string>();
    const [radioName, setRadioName] = useState<string>();
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const navigation = useNavigate();

    useEffect(() => {
        if (isMyRadioProgram) {
            fetchMyRadioPrograms();
        } else {
            fetchRadioStations();
        }
        setCorners([]);

        // 初回レンダリング時のみ実行
        if (firstRender) {
            setRadioInfoFromGetParams();
            fetchMessageTemplates();
            setFirstRender(false);
        }
    }, [isMyRadioProgram]);

    const setRadioInfoFromGetParams = async () => {
        if (getParams.get('radio_program')) {
            fetchRadioProgramFromParams();
            if (getParams.get('program_corner')) {
                setProgramCornerId(String(getParams.get('program_corner')));
            }
        }

        if (getParams.get('my_radio_program')) {
            setIsMyRadioProgram(true);
            fetchMyRadioProgramFromParams();
            if (getParams.get('my_program_corner')) {
                setProgramCornerId(String(getParams.get('my_program_corner')));
            }
        }
    }

    // データ取得関連
    const fetchRadioStations = async () => {
        setRadioPrograms([]);
        try {
            const radioStationsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_stations`);
            setRadioStations(radioStationsResponse.data.radio_stations.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMyRadioPrograms = async () => {
        try {
            const radioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs`);
            setRadioPrograms(radioProgramsResponse.data.listener_my_programs.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMessageTemplates = async () => {
        try {
            const messageTemplatesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates`);
            setMessageTemplates(messageTemplatesResponse.data.message_templates);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRadioProgramFromParams = async () => {
        try {
            const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs/${getParams.get('radio_program')}`);
            fetchRadioProgramRelatedWithRadioStation(RadioProgramsResponse.data.radio_program.radio_station_id);
            fetchCorner(String(getParams.get('radio_program')))
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMyRadioProgramFromParams = async () => {
        try {
            const MessageTemplatesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_my_programs`);
            setRadioPrograms(MessageTemplatesResponse.data.listener_my_programs.data);
            setRadioProgramId(String(getParams.get('my_radio_program')));
            const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners?listener_my_program=${String(getParams.get('my_radio_program'))}`);
            setCorners(ConrernsResponse.data.my_program_corners.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRadioProgramRelatedWithRadioStation = async (radio_station_id: string) => {
        setRadioStationId(radio_station_id);
        try {
            const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs?radio_station=${radio_station_id}`);
            setRadioPrograms(RadioProgramsResponse.data.radio_programs.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCorner = async (radio_program_id: string) => {
        setRadioProgramId(radio_program_id);
        try {
            if (isMyRadioProgram) {
                const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my_program_corners?listener_my_program=${radio_program_id}`);
                setCorners(ConrernsResponse.data.my_program_corners.data);
            } else {
                const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/program_corners?radio_program=${radio_program_id}`);
                setCorners(ConrernsResponse.data.program_corners.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const toggleMessageTemplate = () => {
        setIsUsedMessageTemplate(!isUsedMessageTemplate);
        if (isUsedMessageTemplate) {
            setContent('');
        }
    }

    const showMessageTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const messageTemplate = messageTemplates.find(messageTemplate => {
            return (messageTemplate.id === Number(e.target.value))
        });
        setContent(messageTemplate?.content);
    }

    const sendMessage = async () => {
        try {
            let MessagePostResponse;
            if (isMyRadioProgram) {
                MessagePostResponse = await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages`, {
                    listener_my_program_id: radioProgramId,
                    my_program_corner_id: programCornerId,
                    subject: subject,
                    content: content,
                    radio_name: radioName,
                    listener_info_flag: isSentListenerinfo,
                    tel_flag: isSentTel
                });
            } else {
                MessagePostResponse = await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages`, {
                    radio_program_id: radioProgramId,
                    program_corner_id: programCornerId,
                    subject: subject,
                    content: content,
                    radio_name: radioName,
                    listener_info_flag: isSentListenerinfo,
                    tel_flag: isSentTel
                });
            }
            if (MessagePostResponse.status === 201) {
                navigation('/message_post/complete', { state: { radio_program_id: radioProgramId, is_my_radio_program: isMyRadioProgram } })
            } else {
                alert(MessagePostResponse.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const saveMessage = async () => {
        try {
            let MessageSaveResponse;
            if (isMyRadioProgram) {
                MessageSaveResponse = await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages/save`, {
                    listener_my_program_id: radioProgramId,
                    my_program_corner_id: programCornerId,
                    subject: subject,
                    content: content,
                    radio_name: radioName,
                    listener_info_flag: isSentListenerinfo,
                    tel_flag: isSentTel
                });
            } else {
                MessageSaveResponse = await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages/save`, {
                    radio_program_id: radioProgramId,
                    program_corner_id: programCornerId,
                    subject: subject,
                    content: content,
                    radio_name: radioName,
                    listener_info_flag: isSentListenerinfo,
                    tel_flag: isSentTel
                });
            }
            if (MessageSaveResponse.status === 201) {
                navigation('/messages');
            } else {
                alert(MessageSaveResponse.data.message);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                <Pagehead
                    title="Message Post"
                    subtitle='メッセージ投稿'
                />
                <InnerBox>
                    <CheckBox
                        label='is_used_my_radio_program'
                        text='マイラジオ番組を使用する'
                        is_first_item={true}
                        checked={isMyRadioProgram}
                        change_action={() => setIsMyRadioProgram(!isMyRadioProgram)}
                    />
                    {
                        isMyRadioProgram
                            ?
                            <></>
                            :
                            <Select
                                key='radio_station'
                                items={radioStations}
                                text='ラジオ局'
                                selected_id={Number(radioStationId)}
                                change_action={e => fetchRadioProgramRelatedWithRadioStation(e.target.value)}
                            />
                    }
                    <Select
                        key='radio_program'
                        items={radioPrograms}
                        text='番組'
                        selected_id={Number(radioProgramId)}
                        change_action={e => fetchCorner(e.target.value)}
                    />
                    <Select
                        key='corner'
                        items={corners}
                        text='コーナー'
                        selected_id={Number(programCornerId)}
                        change_action={e => setProgramCornerId(e.target.value)}
                    />
                    <span>※コーナーを選択した場合、コーナー名が件名になります</span>
                    {
                        programCornerId
                            ?
                            <></>
                            :
                            <Input
                                key='subject'
                                text='件名'
                                change_action={e => setSubject(e.target.value)}
                            />
                    }
                    <Input
                        key='radio_name'
                        text='ラジオネーム'
                        value='ハイキングベアー'
                        change_action={e => setRadioName(e.target.value)}
                    />
                    <CheckBox
                        label='is_used_message_template'
                        text='メッセージテンプレートを使用する'
                        change_action={() => toggleMessageTemplate()}
                    />
                    {
                        isUsedMessageTemplate
                            ?
                            <Select
                                key='message_template'
                                items={messageTemplates}
                                text='テンプレート名'
                                change_action={e => showMessageTemplate(e)}
                            />
                            :
                            <></>
                    }
                    <Textarea
                        key='content'
                        value={content}
                        text='本文'
                        change_action={e => setContent(e.target.value)}
                    />
                    <CheckBox
                        label='is_sent_userifno'
                        text='本名・住所を記載する'
                        change_action={() => setIsSentListenerinfo(!isSentListenerinfo)}
                    />
                    <CheckBox
                        label='is_sent_tel'
                        text='電話番号を記載する'
                        change_action={() => setIsSentTel(!isSentTel)}
                    />
                </InnerBox>
                <Button
                    text='投稿する'
                    type='post'
                    click_action={sendMessage}
                />
                <Button
                    text='一時保存'
                    type='get'
                    click_action={saveMessage}
                />
            </MainLayout>
        </>
    )
}
