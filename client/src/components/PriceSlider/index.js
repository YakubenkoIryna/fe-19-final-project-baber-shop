import React, {useState}  from 'react';
import { Slider, InputNumber, Row, Col, Form } from 'antd';
import './styles.less';

const PriceSlider = ({query, onChange}) => {

    const {minPrice: min = 0, maxPrice: max = 1000} = query;

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    const onSliderChange = value => {
        setMinVal(value[0]);
        setMaxVal(value[1]);
    }

    const onSliderMouseUp = value => {
        query.minPrice = value[0];
        query.maxPrice = value[1];
        onChange();
    }

    const onChangeInputMin = value => {
        if (maxVal > value) {
            setMinVal(value);
            query.minPrice = value;
            query.maxPrice = maxVal;
            onChange();
        }
    }

    const onChangeInputMax = value => {
        if (minVal < value) {
            setMaxVal(value);
            query.maxPrice = value;
            query.minPrice = minVal;
            onChange();
        }
    }

    return (
        <div className='slider-container'>
            <div className='slider-heading-container'>
                <p className='slider-heading'>Price</p>
            </div>
            <Row justify='space-between'>
                <Col span={12}>
                    <Form.Item label='from'>
                        <InputNumber
                            min={1}
                            max={1000}
                            style={{ margin: '0 9px' }}
                            step={1}
                            value={minVal}
                            onChange={onChangeInputMin}
                            addonBefore='from'
                        />
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item label='to'>
                        <InputNumber
                            min={1}
                            max={1000}
                            style={{ margin: '0 9px' }}
                            step={1}
                            value={maxVal}
                            onChange={onChangeInputMax}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Slider
                        min={1}
                        max={1000}
                        step={1}
                        range
                        defaultValue={[min, max]}
                        onChange={onSliderChange}
                        onAfterChange={onSliderMouseUp}
                        value={[minVal, maxVal]}
                    />
                </Col>
            </Row>

        </div>
    )
}

export default PriceSlider;
