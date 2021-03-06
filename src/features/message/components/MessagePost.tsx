import axios from '../../../settings/Axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { MainLayout, InnerBox } from '../../../components/Layout';
import { Pagehead } from '../../../components/Pagehead';
import { Button, Loading } from '../../../components/Elements';
import { Input, CheckBox, Textarea, Select } from '../../../components/Form';
import { isAuthorized } from '../../../modules/auth/isAuthorized';
import { usePostApi } from '../../../hooks/usePostApi';

import { SelectItemType } from '../../../types/common';

import '../../../assets/css/components/pagination.css';

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { response: myRadioProgramPostResponse, postApi: postMessageToMyRadioProgram } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages`, {
        listener_my_program_id: radioProgramId,
        my_program_corner_id: programCornerId,
        subject: subject,
        content: content,
        radio_name: radioName,
        listener_info_flag: isSentListenerinfo,
        tel_flag: isSentTel
    });
    const { response: radioProgramPostResponse, postApi: PostMessageToRadioProgram } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages`, {
        radio_program_id: radioProgramId,
        program_corner_id: programCornerId,
        subject: subject,
        content: content,
        radio_name: radioName,
        listener_info_flag: isSentListenerinfo,
        tel_flag: isSentTel
    });
    const { response: myRadioProgramSaveResponse, postApi: saveMessageToMyRadioProgram } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/saved-messages`, {
        listener_my_program_id: radioProgramId,
        my_program_corner_id: programCornerId,
        subject: subject,
        content: content,
        radio_name: radioName,
        listener_info_flag: isSentListenerinfo,
        tel_flag: isSentTel
    });
    const { response: radioProgramSaveResponse, postApi: saveMessageToRadioProgram } = usePostApi(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/saved-messages`, {
        radio_program_id: radioProgramId,
        program_corner_id: programCornerId,
        subject: subject,
        content: content,
        radio_name: radioName,
        listener_info_flag: isSentListenerinfo,
        tel_flag: isSentTel
    });

    const navigation = useNavigate();

    useEffect(() => {
        if (myRadioProgramPostResponse.status === 201 || radioProgramPostResponse.status === 201) {
            navigation('/message_post/complete', { state: { radio_program_id: radioProgramId, is_my_radio_program: isMyRadioProgram } });
        }
        if (myRadioProgramSaveResponse.status === 201 || radioProgramSaveResponse.status === 201) {
            navigation('/saved_messages', { state: { flash_message: '??????????????????????????????????????????' } });
        }
        authorized();
        if (isMyRadioProgram) {
            fetchMyRadioPrograms();
        } else {
            fetchRadioStations();
        }
        setCorners([]);

        // ???????????????????????????????????????
        if (firstRender) {
            firstRenderingAction();
        }
    }, [isMyRadioProgram, myRadioProgramPostResponse, radioProgramPostResponse, myRadioProgramSaveResponse, radioProgramSaveResponse]);

    const authorized = async () => {
        let authorized = await isAuthorized();
        if (!authorized) {
            navigation('/login');
        }
    }

    const firstRenderingAction = async () => {
        await setRadioInfoFromGetParams();
        await fetchMessageTemplates();
        setFirstRender(false);
        setIsLoading(false);
    }

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

        if (getParams.get('saved_message')) {
            fetchSavedMessage();
        }
    }

    // ?????????????????????
    const fetchRadioStations = async () => {
        setRadioPrograms([]);
        try {
            const radioStationsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-stations`);
            setRadioStations(radioStationsResponse.data.radio_stations.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMyRadioPrograms = async () => {
        try {
            const radioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs`);
            setRadioPrograms(radioProgramsResponse.data.listener_my_programs.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMessageTemplates = async () => {
        try {
            const messageTemplatesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message-templates`);
            setMessageTemplates(messageTemplatesResponse.data.message_templates.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRadioProgramFromParams = async () => {
        try {
            const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs/${getParams.get('radio_program')}`);
            fetchRadioProgramRelatedWithRadioStation(RadioProgramsResponse.data.radio_program.radio_station_id);
            fetchCorner(String(getParams.get('radio_program')))
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMyRadioProgramFromParams = async () => {
        try {
            const MyRadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs`);
            setRadioPrograms(MyRadioProgramsResponse.data.listener_my_programs.data);
            setRadioProgramId(String(getParams.get('my_radio_program')));
            const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my-program-corners?listener_my_program=${String(getParams.get('my_radio_program'))}`);
            setCorners(ConrernsResponse.data.my_program_corners.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRadioProgramRelatedWithRadioStation = async (radio_station_id: string) => {
        setRadioStationId(radio_station_id);
        try {
            const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs?radio_station=${radio_station_id}`);
            setRadioPrograms(RadioProgramsResponse.data.radio_programs.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCorner = async (radio_program_id: string) => {
        setRadioProgramId(radio_program_id);
        try {
            if (isMyRadioProgram) {
                const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my-program-corners?listener_my_program=${radio_program_id}`);
                setCorners(ConrernsResponse.data.my_program_corners.data);
            } else {
                const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/program-corners?radio_program=${radio_program_id}`);
                setCorners(ConrernsResponse.data.program_corners.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchSavedMessage = async () => {
        try {
            const SavedMessageResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-messages/${getParams.get('saved_message')}`);
            if (SavedMessageResponse.data.listener_message.radio_program_id) {
                const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio-programs/${SavedMessageResponse.data.listener_message.radio_program_id}`);
                fetchRadioProgramRelatedWithRadioStation(RadioProgramsResponse.data.radio_program.radio_station_id);
                setRadioProgramId(String(SavedMessageResponse.data.listener_message.radio_program_id));
                fetchCorner(SavedMessageResponse.data.listener_message.radio_program_id);
                if (SavedMessageResponse.data.listener_message.program_corner_id) {
                    setProgramCornerId(String(SavedMessageResponse.data.listener_message.program_corner_id));
                }
            }
            if (SavedMessageResponse.data.listener_message.listener_my_program_id) {
                setIsMyRadioProgram(true);
                const MyRadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener-my-programs`);
                setRadioPrograms(MyRadioProgramsResponse.data.listener_my_programs.data);
                setRadioProgramId(SavedMessageResponse.data.listener_message.listener_my_program_id);
                const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/my-program-corners?listener_my_program=${SavedMessageResponse.data.listener_message.listener_my_program_id}`);
                setCorners(ConrernsResponse.data.my_program_corners.data);
                if (SavedMessageResponse.data.listener_message.my_program_corner_id) {
                    setProgramCornerId(String(SavedMessageResponse.data.listener_message.my_program_corner_id));
                }
            }
            if (SavedMessageResponse.data.listener_message.subject) {
                setSubject(SavedMessageResponse.data.listener_message.subject);
            }
            setRadioName(SavedMessageResponse.data.listener_message.radio_name);
            setContent(SavedMessageResponse.data.listener_message.content);
            setIsSentListenerinfo(SavedMessageResponse.data.listener_message.listener_info_flag);
            setIsSentTel(SavedMessageResponse.data.listener_message.tel_flag);
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

    const sendMessage = () => {
        try {
            if (isMyRadioProgram) {
                postMessageToMyRadioProgram();
            } else {
                PostMessageToRadioProgram();
            }
        } catch (err) {
            console.log(err)
        }
    }

    const saveMessage = async () => {
        try {
            if (isMyRadioProgram) {
                saveMessageToMyRadioProgram();
            } else {
                saveMessageToRadioProgram();
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <MainLayout>
                {isLoading ? <Loading /> : <></>}
                <Pagehead
                    title="Message Post"
                    subtitle='?????????????????????'
                />
                <InnerBox>
                    <CheckBox
                        label='is_used_my_radio_program'
                        text='????????????????????????????????????'
                        is_first_item={true}
                        checked={isMyRadioProgram}
                        changeAction={() => setIsMyRadioProgram(!isMyRadioProgram)}
                    />
                    {
                        isMyRadioProgram
                            ?
                            <></>
                            :
                            <Select
                                key='radio_station'
                                items={radioStations}
                                text='????????????'
                                selected_id={Number(radioStationId)}
                                changeAction={e => fetchRadioProgramRelatedWithRadioStation(e.target.value)}
                            />
                    }
                    <Select
                        key='radio_program'
                        items={radioPrograms}
                        text='??????'
                        selected_id={Number(radioProgramId)}
                        changeAction={e => fetchCorner(e.target.value)}
                    />
                    <Select
                        key='corner'
                        items={corners}
                        text='????????????'
                        selected_id={Number(programCornerId)}
                        changeAction={e => setProgramCornerId(e.target.value)}
                    />
                    <span>??????????????????????????????????????????????????????????????????????????????</span>
                    {
                        programCornerId
                            ?
                            <></>
                            :
                            <Input
                                key='subject'
                                text='??????'
                                changeAction={e => setSubject(e.target.value)}
                            />
                    }
                    <Input
                        key='radio_name'
                        text='??????????????????'
                        value='????????????????????????'
                        changeAction={e => setRadioName(e.target.value)}
                    />
                    <CheckBox
                        label='is_used_message_template'
                        text='????????????????????????????????????????????????'
                        changeAction={() => toggleMessageTemplate()}
                    />
                    {
                        isUsedMessageTemplate
                            ?
                            <Select
                                key='message_template'
                                items={messageTemplates}
                                text='?????????????????????'
                                changeAction={e => showMessageTemplate(e)}
                            />
                            :
                            <></>
                    }
                    <Textarea
                        key='content'
                        value={content}
                        text='??????'
                        changeAction={e => setContent(e.target.value)}
                    />
                    <CheckBox
                        label='is_sent_userifno'
                        text='??????????????????????????????'
                        checked={isSentListenerinfo}
                        changeAction={() => setIsSentListenerinfo(!isSentListenerinfo)}
                    />
                    <CheckBox
                        label='is_sent_tel'
                        text='???????????????????????????'
                        checked={isSentTel}
                        changeAction={() => setIsSentTel(!isSentTel)}
                    />
                </InnerBox>
                <Button
                    text='????????????'
                    type='post'
                    clickAction={sendMessage}
                />
                <Button
                    text='????????????'
                    type='get'
                    clickAction={saveMessage}
                />
            </MainLayout>
        </>
    )
}
