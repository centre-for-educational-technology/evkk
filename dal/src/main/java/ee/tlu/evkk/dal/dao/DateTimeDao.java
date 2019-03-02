package ee.tlu.evkk.dal.dao;

import org.apache.ibatis.annotations.Select;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @author Mikk Tarvas
 * Date: 2019-02-18
 */
public interface DateTimeDao {

    @Select("SELECT transaction_timestamp();")
    LocalDateTime currentDateTime();

    @Select("SELECT transaction_timestamp()::DATE;")
    LocalDate currentDate();

}
