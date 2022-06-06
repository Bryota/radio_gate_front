import axios from '../../../settings/Axios';
import { useNavigate } from 'react-router-dom';
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

type MessageTemplatesType = {
    id: number
    name: string

}

export const MessagePost = () => {
    const [isMyRadioProgram, setIsMyRadioProgram] = useState<boolean>(false);
    const [isusedMessageTemplate, setIsUsedMessageTemplate] = useState<boolean>(false);
    const [radioStations, setRadioStations] = useState<SelectItemType[]>();
    const [radioPrograms, setRadioPrograms] = useState<SelectItemType[]>();
    const [corners, setCorners] = useState<SelectItemType[]>();
    const [messageTemplates, setMessageTemplates] = useState<SelectItemType[]>([]);
    const [radioProgramId, setRadioProgramId] = useState<string>();
    const [programCornerId, setProgramCornerId] = useState<string>();
    const [subject, setSubject] = useState<string>();
    const [content, setContent] = useState<string>();
    const [radioName, setRadioName] = useState<string>();
    const navigation = useNavigate();

    useEffect(() => {
        const fetchRadioStation = async () => {
            try {
                const RadioStationsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_stations`);
                setRadioStations(RadioStationsResponse.data.radio_stations);
            } catch (err) {
                console.log(err);
            }
        }
        const fetchMessageTemplates = async () => {
            try {
                const MessageTemplatesResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/message_templates`);
                setMessageTemplates(MessageTemplatesResponse.data.message_templates);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioStation();
        fetchMessageTemplates();
    }, [isMyRadioProgram]);

    const set_radio_program = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fetchRadioProgram = async () => {
            try {
                const RadioProgramsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/radio_programs?radio_station=${e.target.value}`);
                setRadioPrograms(RadioProgramsResponse.data.radio_programs);
            } catch (err) {
                console.log(err);
            }
        }
        fetchRadioProgram();
    }

    const set_corner = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRadioProgramId(e.target.value)
        const fetchCorner = async () => {
            try {
                const ConrernsResponse = await axios.get(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/program_corners?radio_program=${e.target.value}`);
                setCorners(ConrernsResponse.data.program_corners);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCorner();
    }

    const set_message_template = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const messageTemplate = messageTemplates.find(messageTemplate => {
            return (messageTemplate.id === Number(e.target.value))
        });
        setContent(messageTemplate?.content);
    }

    const send_handler = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_RADIO_GATE_API_URL}/api/listener_messages`, {
                radio_program_id: radioProgramId,
                program_corner_id: programCornerId,
                subject: subject,
                content: content,
                radio_name: radioName
            }).then((res) => {
                if (res.status === 201) {
                    navigation('/message_post/complete', { state: { radio_program_id: radioProgramId } })
                } else {
                    alert(res.data.message)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const click_handler = () => {
        return '';
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
                    />
                    <Select
                        key='radio_station'
                        items={radioStations}
                        text='ラジオ局'
                        change_action={e => set_radio_program(e)}
                    />
                    <Select
                        key='radio_program'
                        items={radioPrograms}
                        text='番組'
                        change_action={e => set_corner(e)}
                    />
                    <Select
                        key='corner'
                        items={corners}
                        text='コーナー'
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
                        change_action={() => setIsUsedMessageTemplate(!isusedMessageTemplate)}
                    />
                    {
                        isusedMessageTemplate
                            ?
                            <Select
                                key='message_template'
                                items={messageTemplates}
                                text='テンプレート名'
                                change_action={e => set_message_template(e)}
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
                    />
                    <CheckBox
                        label='is_sent_tel'
                        text='電話番号を記載する'
                    />
                </InnerBox>
                <Button
                    text='投稿する'
                    type='post'
                    click_action={send_handler}
                />
                <Button
                    text='一時保存'
                    type='get'
                    click_action={click_handler}
                />
            </MainLayout>
        </>
    )
}
